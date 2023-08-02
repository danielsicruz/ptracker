const Sequelize = require('sequelize')
const database = require('./db')

const Object = database.define('Context',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING
    },    
})