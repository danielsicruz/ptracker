const Sequelize = require('sequelize')
const database = require('./db')

const Object = database.define('User',{
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