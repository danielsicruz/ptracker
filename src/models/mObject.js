const Sequelize = require('sequelize')
const database = require('./db')

const Object = database.define('Object',{
    id:{
        type:Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING
    },
    description:{
        type:Sequelize.TEXT
    },
    imagePath:{
        type:Sequelize.TEXT
    }
})