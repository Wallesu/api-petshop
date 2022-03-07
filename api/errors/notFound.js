class NotFound extends Error {
    constructor() {
        super('Fornecedor não foi encontrado.')
        this.name = 'NotFound'
        this.id = 0
    }
}

module.exports = NotFound
