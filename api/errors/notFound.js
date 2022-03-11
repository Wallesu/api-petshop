class NotFound extends Error {
    constructor(item) {
        super(`${item} não foi encontrado.`)
        this.name = 'NotFound'
        this.id = 0
    }
}

module.exports = NotFound
