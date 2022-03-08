const router = require('express').Router()
const ProviderTable = require('../models/Provider')
const Provider = require('../services/providers')
const SerializerProvider = require('../Serializer').SerializerProvider

router.get('/', async (req, res) => {
    try {
        const result = await ProviderTable.findAll({
            raw: true,
        })
        res.status(200)
        const serializer = new SerializerProvider(res.getHeader('Content-type'))
        res.send(serializer.serialize(result))
    } catch (error) {
        res.send(
            serializer.serialize({
                message: error.message,
            })
        )
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const provider = new Provider({ id: req.params.id })
        const result = await provider.get()
        res.status(200)
        const serializer = new SerializerProvider(
            res.getHeader('Content-type'),
            ['email', 'createdAt', 'updatedAt']
        )
        res.send(serializer.serialize(result))
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const provider = new Provider(req.body)
        await provider.create()
        res.status(201)
        const serializer = new SerializerProvider(res.getHeader('Content-type'))
        res.send(serializer.serialize(provider))
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const body = req.body
        const data = Object.assign({}, body, { id: id })
        const provider = new Provider(data)
        await provider.update()
        res.status(204)
        res.end()
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const provider = new Provider({ id: req.params.id })
        await provider.get()
        await provider.delete()
        res.status(204)
        res.end()
    } catch (error) {
        next(error)
    }
})

const routerProducts = require('./products')

const verifyProvider = async (req, res, next) => {
    try {
        const provider = new Provider({ id: req.params.provider_id })
        await provider.get()
        req.provider = provider
        next()
    } catch (error) {
        next(error)
    }
}

router.use('/:provider_id/produtos', verifyProvider, routerProducts)

module.exports = router
