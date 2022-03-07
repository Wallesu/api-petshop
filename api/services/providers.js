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
        this.validate()
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

    async update() {
        await ProviderModel.findOne({
            where: {
                id: this.id,
            },
        })
        const fields = ['company', 'email', 'category']
        const dataToUpdate = {}

        fields.forEach((field) => {
            const value = this[field]
            if (typeof value === 'string' && value.length > 0) {
                dataToUpdate[field] = value
            }
        })

        if (Object.keys(dataToUpdate).length === 0) {
            throw new Error('Não foram fornecidos dados para atualizar.')
        }

        console.log(dataToUpdate)

        const result = await ProviderModel.update(dataToUpdate, {
            where: {
                id: this.id,
            },
        })

        return result
    }

    async delete() {
        try {
            const result = ProviderModel.destroy({
                where: {
                    id: this.id,
                },
            })

            return result
        } catch (error) {
            throw new Error('Falha ao deletar fornecedor.')
        }
    }

    validate() {
        const fields = ['company', 'email', 'category']

        fields.forEach((field) => {
            const value = this[field]

            if (typeof value !== 'string' || value.length === 0) {
                throw new Error(`O campo ${field} está inválido.`)
            }
        })
    }
}

module.exports = Provider
