const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const NotFound = require('./errors/notFound')
const InvalidField = require('./errors/invalidField')
const DataNotProvided = require('./errors/dataNotProvided')
const UnsupportedValue = require('./errors/unsupportedValue')
const acceptedFormats = require('./Serializer').AcceptedFormats
const SerializerErro = require('./Serializer').SerializerErro

const app = express()
app.use(bodyParser.json())

app.use((req, res, next) => {
    let requestFormat = req.header('Accept')
    if (requestFormat === '*/*') requestFormat = 'application/json'

    if (!acceptedFormats.includes(requestFormat)) {
        res.status(406)
        res.end()
        return
    }
    res.setHeader('Content-Type', requestFormat)
    next()
})

const router = require('./routes/providers')
app.use('/api/fornecedores', router)

app.use((error, req, res, next) => {
    let status = 500
    if (error instanceof NotFound) status = 404
    if (error instanceof InvalidField || error instanceof DataNotProvided)
        status = 400

    if (error instanceof UnsupportedValue) status = 406

    res.status(status)
    const serializer = new SerializerErro(res.getHeader('Content-type'))
    res.send(
        serializer.serialize({
            message: error.message,
            idError: error.id,
        })
    )
})

app.listen(config.get('api.port'), () => {
    console.log('Working!')
})
