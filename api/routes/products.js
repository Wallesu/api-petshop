const router = require('express').Router({ mergeParams: true })
const ProductModel = require('../models/Products')
const Product = require('../services/products')
const SerializerProduct = require('../Serializer').SerializerProduct

router.head('/:id', async (req, res, next) => {
    try {
        const data = {
            id: req.params.id,
            provider_id: req.provider.id,
        }
        const product = new Product(data)
        await product.get()
        res.set('Last-Modified', (new Date(product.updatedAt)).getTime())
        res.set('X-Powered-By', "Walle's API")
        res.status(200)
        res.end()
    } catch (error) {
        next(error)
    }
})

router.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET, POST')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(204)
    res.end()
})

router.get('/', async (req, res) => {
    const result = await ProductModel.findAll({
        where: {
            provider_id: req.provider.id,
        },
        raw: true
    })
    const serializer = new SerializerProduct(res.getHeader('Content-Type'))
    res.set('X-Powered-By', "Walle's API")
    res.send(serializer.serialize(result))
})

router.options('/:id', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE, HEAD')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(204)
    res.end()
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
        res.set('Last-Modified', (new Date(product.updatedAt)).getTime())
        res.set('X-Powered-By', "Walle's API")
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
        res.set('X-Powered-By', "Walle's API")
        res.send(serializer.serialize(product))
    } catch (error) {
        next(error)
    }
})


router.options('/:id/decrease-stock', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'POST')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(204)
    res.end()
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
        res.set('Last-Modified', (new Date(product.updatedAt)).getTime())
        res.status(204)
        res.set('X-Powered-By', "Walle's API")
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
        res.set('Last-Modified', (new Date(product.updatedAt)).getTime())
        res.status(204)
        res.set('X-Powered-By', "Walle's API")
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
    res.set('X-Powered-By', "Walle's API")
    res.end()
})

module.exports = router
