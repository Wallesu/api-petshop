const router = require('express').Router()
const ProviderTable = require('../models/Provider')
const Provider = require('../services/providers')

router.get('/', async (req, res) => {
    const result = await ProviderTable.findAll()
    res.send(JSON.stringify(result))
})

router.get('/:id', async (req, res) => {
    try {
        const provider = new Provider({ id: req.params.id })
        const result = await provider.get()
        res.send(JSON.stringify(result))
    } catch (error) {
        res.send(
            JSON.stringify({
                message: error.message,
            })
        )
    }
})

router.post('/', async (req, res) => {
    const provider = new Provider(req.body)
    await provider.create()
    res.send(JSON.stringify(provider))
})

module.exports = router
