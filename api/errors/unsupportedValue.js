class UnsupportedValue extends Error {
    constructor(contentType) {
        super(`${contentType} não é suportado.`)
        this.id = 3
        this.name = 'UnsupportedValue'
    }
}

module.exports = UnsupportedValue
