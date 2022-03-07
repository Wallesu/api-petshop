const router = require('express').Router()
const ProviderTable = require('../models/Provider')
const Provider = require('../services/providers')

router.get('/', async (req, res) => {
    try {
        const result = await ProviderTable.findAll()
        res.status(200)
        res.send(JSON.stringify(result))
    } catch (error) {
        res.send(
            JSON.stringify({
                message: error.message,
            })
        )
    }
})

router.get('/:id', async (req, res) => {
    try {
        const provider = new Provider({ id: req.params.id })
        const result = await provider.get()
        res.status(200)
        res.send(JSON.stringify(result))
    } catch (error) {
        res.status(404)
        res.send(
            JSON.stringify({
                message: error.message,
            })
        )
    }
})

router.post('/', async (req, res) => {
    try {
        const provider = new Provider(req.body)
        await provider.create()
        res.status(201)
        res.send(JSON.stringify(provider))
    } catch (error) {
        res.status(400)
        res.send(
            JSON.stringify({
                message: error.message,
            })
        )
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const data = Object.assign({}, body, { id: id })
        const provider = new Provider(data)
        await provider.update()
        res.status(204)
        res.end()
    } catch (error) {
        res.status(400)
        res.send(
            JSON.stringify({
                message: error.message,
            })
        )
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const provider = new Provider({ id: req.params.id })
        await provider.get()
        await provider.delete()
        res.status(204)
        res.end()
    } catch (error) {
        res.status(404)
        res.send(
            JSON.stringify({
                message: error.message,
            })
        )
    }
})

module.exports = router