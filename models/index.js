const Sequelize = require('sequelize')
const villainsModel = require('./villains')

const connection = new Sequelize('disney', 'newUser', 'password123',
  { host: 'localhost', dialect: 'mysql' })

const Villains = villainsModel(connection, Sequelize)

module.exports = { Villains }
