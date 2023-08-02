const Sequelize = require('sequelize')
const database = require('./db')

const place = require("./mPlace")
const object = require("./mObject")
const user = require("./mUser")

const ObjectPlace = database.define('ObjectPlace', {
    idObject: {
        type: Sequelize.INTEGER,
        references: {
            model: object,
            key: "id"
        }
    },
    idPlace: {
        type: Sequelize.INTEGER,
        references: {
            model: place,
            key: "id"
        }
    },
    stillThere: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1,
    },
    movedBy: {
        type: Sequelize.INTEGER,
        references: {
            model: user,
            key: "id"
        }
    }

})

module.exports = ObjectPlace