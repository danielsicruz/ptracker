const Sequelize = require('sequelize')
const database = require('./db')

const context = require('./mContext')
const Check = require('./mCheck');

const Place = database.define('Place', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    vid: {
        type: Sequelize.STRING,
    },
    name: {
        type: Sequelize.STRING
    },

}, { paranoid: true });

module.exports = Place