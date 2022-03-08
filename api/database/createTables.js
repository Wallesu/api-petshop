const models = [require('../models/Provider'), require('../models/Products')]

async function createTables() {
    for (let i = 0; i < models.length; i++) {
        await models[i].sync()
    }
}

createTables()
