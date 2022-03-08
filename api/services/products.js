const ProductModel = require('../models/Products')

class Product {
    constructor({
        id,
        title,
        price,
        stock,
        provider_id,
        createdAt,
        updatedAt,
    }) {
        this.id = id
        this.title = title
        this.price = price
        this.stock = stock
        this.provider_id = provider_id
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    async create() {
        this.validate()
        const result = await ProductModel.create({
            title: this.title,
            price: this.price,
            stock: this.stock,
            provider_id: this.provider_id,
        })

        this.id = result.id
        this.createdAt = result.createdAt
        this.updatedAt = result.updatedAt
    }

    async get() {
        const result = await ProductModel.findOne({
            where: {
                id: this.id,
                provider_id: this.provider_id,
            },
            raw: true,
        })

        if (!result) {
            throw new Error('Produto não foi encontrado.')
        }

        this.title = result.title
        this.price = result.price
        this.stock = result.stock
        this.createdAt = result.createdAt
        this.updatedAt = result.updatedAt
    }

    async delete() {
        return await ProductModel.destroy({
            where: {
                id: this.id,
                provider_id: this.provider_id,
            },
        })
    }

    validate() {
        if (typeof this.title !== 'string' || this.title.length === 0) {
            throw new Error('O campo titulo está inválido')
        }
        if (typeof this.price !== 'number' || this.price <= 0) {
            throw new Error('O campo preco está inválido')
        }
    }
}

module.exports = Product
