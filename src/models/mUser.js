const Sequelize = require('sequelize')
const database = require('./db')

const User = database.define('User',{
    id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncremet: true
    },
    name:{
        type: Sequelize.STRING
    },
    login:{
        type:Sequelize.STRING
    },
    password:{
        type:Sequelize.TEXT
    }
    
})

module.exports = User