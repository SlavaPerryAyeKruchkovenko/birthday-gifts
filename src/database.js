const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gifts-db', 'user', 'pass', {
    dialect: 'sqlite',
    host: './database.db'
})

module.exports = sequelize;