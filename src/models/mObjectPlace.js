const Sequelize = require('sequelize')
const database = require('./db')

const place = require("./mPlace")
const object = require("./mObject")
const user = require("./mUser")
const Check = require('./mCheck')

const ObjectPlace = database.define('ObjectPlace', {
    isThere: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1,
    },
    movedBy: {
        type: Sequelize.UUID,
        references: {
            model: user,
            key: "id"
        }
    },
    lastCheck:{
        type: Sequelize.UUID,
        allowNull:true,
        references:{
            model: Check,
            key:"id"
        }
    }

})

module.exports = ObjectPlace