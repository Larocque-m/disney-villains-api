const models = require('../models')

const getAllVillains = async (request, response) => {
  const Villains = await models.Villains.findAll()

  return response.send(Villains)
}

const getVillainsBySlug = async (request, response) => {
  const { slug } = request.params

  const matchingVillain = await models.Villains.findOne({ where: { slug } })

  return response.send(matchingVillain)
}

models.exports = { getAllVillains, getVillainsBySlug }
