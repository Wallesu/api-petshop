const UnsupportedValue = require('./errors/unsupportedValue')

class Serializer {
    json(data) {
        return JSON.stringify(data)
    }
    serialize(data) {
        if (this.contentType === 'application/json') {
            return this.json(data)
        } else {
            throw new UnsupportedValue()
        }
    }
}
