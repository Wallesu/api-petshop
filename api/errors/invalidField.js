class InvalidField extends Error {
    constructor(field) {
        super(`O campo ${field} está inválido.`)
        this.id = 1
        this.name = 'InvalidField'
    }
}

module.exports = InvalidField
