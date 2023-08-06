const Sequelize = require('sequelize');
const database = require('./db');

const Movement = database.define('Movement', {
    idObject: {
        type: Sequelize.INTEGER,
        references: {
            model: object,
            key: "id"
        }
    },
    fromIdPlace: {
        type: Sequelize.INTEGER,
        references: {
            model: place,
            key: "id"
        }
    },
    toIdPlace: {
        type: Sequelize.INTEGER,
        references: {
            model: place,
            key: "id"
        }
    },
    temporary: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    },
    whenBack:{
        type:Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

module.exports = Movement