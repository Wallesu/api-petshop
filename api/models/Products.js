const Sequelize = require('sequelize')
const instance = require('../database/')
const ProviderModel = require('./Provider')

const Product = instance.define('Product', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defautValue: 0,
    },
    provider_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: ProviderModel,
            key: 'id',
        },
    },
})

module.exports = Product
