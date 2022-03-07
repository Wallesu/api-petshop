const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const NotFound = require('./errors/notFound')
const InvalidField = require('./errors/invalidField')
const DataNotProvided = require('./errors/dataNotProvided')

const app = express()
app.use(bodyParser.json())

const router = require('./routes/providers')
app.use('/api/fornecedores', router)

app.use((error, req, res, next) => {
    let status = 500
    if (error instanceof NotFound) status = 404
    if (error instanceof InvalidField) status = 400
    if (error instanceof DataNotProvided) status = 400

    res.status(status)
    res.send(
        JSON.stringify({
            message: error.message,
            idError: error.id,
        })
    )
})

app.listen(config.get('api.port'), () => {
    console.log('Working!')
})
