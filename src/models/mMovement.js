const Sequelize = require('sequelize');
const database = require('./db');

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