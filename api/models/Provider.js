const Sequelize = require('sequelize')
const instance = require('../database/')

const Provider = instance.define('Provider', {
    company: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    category: {
        type: Sequelize.ENUM('ração', 'brinquedos'),
        allowNull: false,
    },
})

module.exports = Provider
