const models = require('../models')

const getAllVillains = async (request, response) => {
  const Villains = await models.Villains.findAll()

  return response.send(Villains)
}

models.exports = { getAllVillains }
