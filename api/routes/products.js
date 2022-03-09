const router = require('express').Router({ mergeParams: true })
const ProductModel = require('../models/Products')
const Product = require('../services/products')
const SerializerProduct = require('../Serializer').SerializerProduct

router.get('/', async (req, res) => {
    const result = await ProductModel.findAll({
        where: {
            provider_id: req.provider.id,
        },
        raw: true
    })
    const serializer = new SerializerProduct(res.getHeader('Content-Type'))
    res.send(serializer.serialize(result))
})

router.get('/:id', async (req, res, next) => {
    try {
        const data = {
            id: req.params.id,
            provider_id: req.provider.id,
        }
        const product = new Product(data)
        await product.get()
        const serializer = new SerializerProduct(res.getHeader('Content-Type'), ['price','stock','provider_id','createdAt','updatedAt'])
        res.send(serializer.serialize(product))
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
        const serializer = new SerializerProduct(res.getHeader('Content-Type'))
        res.status(201)
        res.send(serializer.serialize(product))
    } catch (error) {
        next(error)
    }
})

router.post('/:id/decrease-stock', async (req, res, next) => {
    try {
        const product = new Product({
            id: req.params.id,
            provider_id: req.provider.id
        })

        await product.get()

        product.stock = product.stock - req.body.value
        await product.decreaseStock()
        res.status(204)
        res.end()
    } catch (error) {
        next(error)
    }
    
})

router.put('/:id', async (req, res, next) => {
    try {
        const data = Object.assign(
            {},
            req.body,
            {
                id: req.params.id,
                provider_id: req.provider.id
            }
        )
        const product = new Product(data)
        await product.update()
        res.status(204)
        res.end()
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
