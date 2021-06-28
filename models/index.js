const Sequelize = require('sequelize')
const villainsModel = require('./villains')

const connection = new Sequelize('Disneyvillains', 'wrongdoers', 'password123',
  { host: 'localhost', dialect: 'mysql' })

const Villains = villainsModel(connection, Sequelize)

module.exports = { Villains }
