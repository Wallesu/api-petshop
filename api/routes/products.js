const router = require('express').Router({ mergeParams: true })
const ProductModel = require('../models/Products')
const Product = require('../services/products')
const SerializerProduct = require('../Serializer').SerializerProduct

router.get('/', async (req, res) => {
    const result = await ProductModel.findAll({
        where: {
            provider_id: req.provider.id,
        },
    })
    res.send(JSON.stringify(result))
})

router.get('/:id', async (req, res, next) => {
    try {
        const data = {
            id: req.params.id,
            provider_id: req.provider.id,
        }
        const product = new Product(data)
        await product.get()
        res.send(JSON.stringify(product))
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const provider_id = req.provider.id
        const body = req.body
        const data = Object.assign({}, body, { provider_id: provider_id })
        const product = new Product(data)
        await product.create()
        res.status(201)
        res.send(product)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res) => {
    const data = {
        id: req.params.id,
        provider_id: req.provider.id,
    }

    const product = new Product(data)
    await product.delete()
    res.status(204)
    res.end()
})

module.exports = router
