class DataNotProvided extends Error {
    constructor() {
        super('Não foram fornecidos dados para atualizar.')
        this.id = 2
        this.name = 'DataNotProvided'
    }
}

module.exports = DataNotProvided
