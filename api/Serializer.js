const UnsupportedValue = require('./errors/unsupportedValue')
const jsontoxml = require('jsontoxml')

class Serializer {
    json(data) {
        return JSON.stringify(data)
    }

    xml(data) {
        let tag = this.tagSingular
        if (Array.isArray(data)) {
            tag = this.tagPlural
            data = data.map((item) => {
                return {
                    [this.tagSingular]: item,
                }
            })
        }
        return jsontoxml({ [tag]: data })
    }

    serialize(data) {
        data = this.filterArray(data)
        if (this.contentType === 'application/json') {
            return this.json(data)
        }
        if (this.contentType === 'application/xml') {
            return this.xml(data)
        }

        throw new UnsupportedValue(this.contentType)
    }

    filterObject(data) {
        const newObject = {}
        this.publicFields.forEach((field) => {
            if (data.hasOwnProperty(field)) {
                newObject[field] = data[field]
            }
        })
        return newObject
    }
    filterArray(data) {
        if (Array.isArray(data)) {
            data = data.map((data) => {
                return this.filterObject(data)
            })
        } else {
            data = this.filterObject(data)
        }
        return data
    }
}

class SerializerProvider extends Serializer {
    constructor(contentType, extraFields) {
        super()
        this.contentType = contentType
        this.publicFields = ['id', 'company', 'category'].concat(
            extraFields || []
        )
        this.tagSingular = 'provider'
        this.tagPlural = 'providers'
    }
}

class SerializerErro extends Serializer {
    constructor(contentType, extraFields) {
        super()
        this.contentType = contentType
        this.publicFields = ['idError', 'message'].concat(extraFields || [])
        this.tagSingular = 'error'
        this.tagPlural = 'errors'
    }
}

module.exports = {
    Serializer: Serializer,
    SerializerProvider: SerializerProvider,
    SerializerErro: SerializerErro,
    AcceptedFormats: ['application/json', 'application/xml'],
}
