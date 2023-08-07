const Sequelize = require('sequelize');
const database = require('./db');

const User = require("./mUser");
const Place = require("./mPlace");
const Object = require("./mObject");

const Movement = database.define('Movement', {
    temporary: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    whenBack:{
        type:Sequelize.DATE,
        allowNull: true
    },    
    isBack:{
        type:Sequelize.BOOLEAN,
        allowNull: true
    }
});

module.exports = Movement