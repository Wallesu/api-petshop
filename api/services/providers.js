const ProviderModel = require('../models/Provider')
const NotFound = require('../errors/notFound')
const InvalidField = require('../errors/invalidField')
const DataNotProvided = require('../errors/dataNotProvided')

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
                raw: true,
            })
            ;(this.company = result.company),
                (this.email = result.email),
                (this.category = result.category),
                (this.createdAt = result.createdAt),
                (this.updatedAt = result.updatedAt)

            return result
        } catch (error) {
            throw new NotFound()
        }
    }

    async update() {
        const providerExist = await ProviderModel.findOne({
            where: {
                id: this.id,
            },
        })

        if (providerExist === null) throw new NotFound()

        const fields = ['company', 'email', 'category']
        const dataToUpdate = {}

        fields.forEach((field) => {
            const value = this[field]
            if (typeof value === 'string' && value.length > 0) {
                dataToUpdate[field] = value
            }
        })

        if (Object.keys(dataToUpdate).length === 0) {
            throw new DataNotProvided()
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
            throw new NotFound()
        }
    }

    validate() {
        const fields = ['company', 'email', 'category']

        fields.forEach((field) => {
            const value = this[field]

            if (typeof value !== 'string' || value.length === 0) {
                throw new InvalidField(field)
            }
        })
    }
}

module.exports = Provider
