const Sequelize = require('sequelize')
const database = require('./db')
const Check = database.define('Check', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    objectsToFind: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    foundObjects: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    missingObjects: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    notFoundObjects: {
        type:Sequelize.BOOLEAN,
        allowNull:false,
        default:0
    },
    wrongPlaceObjects: {
        type:Sequelize.BOOLEAN,
        allowNull:false,
        default:0
    },
});

module.exports = Check