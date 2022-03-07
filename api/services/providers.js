const ProviderModel = require('../models/Provider')

class Provider {
    constructor({ id, company, email, category, createdAt, updatedAt }) {
        ;(this.id = id),
            (this.company = company),
            (this.email = email),
            (this.category = category),
            (this.createdAt = createdAt),
            (this.updatedAt = updatedAt)
    }

    async create() {
        const result = await ProviderModel.create({
            company: this.company,
            email: this.email,
            category: this.category,
        })

        ;(this.id = result.id),
            (this.createdAt = result.createdAt),
            (this.updatedAt = result.updatedAt)
    }

    async get() {
        try {
            const result = await ProviderModel.findOne({
                where: {
                    id: this.id,
                },
            })
            ;(this.company = result.company),
                (this.email = result.email),
                (this.category = result.category),
                (this.createdAt = result.createdAt),
                (this.updatedAt = result.updatedAt)

            return result
        } catch (error) {
            throw new Error('Fornecedor não encontrado.')
        }
    }
}

module.exports = Provider
