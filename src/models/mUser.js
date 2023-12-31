const Sequelize = require('sequelize')
const database = require('./db')

const User = database.define('User', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: Sequelize.STRING
    },
    login: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.TEXT
    },
    active: {
        type: Sequelize.BOOLEAN
    }

}, { paranoid: true });

module.exports = User