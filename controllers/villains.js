const models = require('../models')

const getAllVillains = async (request, response) => {
  const villains = await models.villains.findAll()

  return response.send(villains)
}

const getVillainsBySlug = async (request, response) => {
  try {
    const { slug } = request.params

    const matchingVillain = await models.villains.findOne({ where: { slug } })

    return matchingVillain
      ? response.send(matchingVillain)
      : response.sendStatus(404)
  } catch (error) {
    return response.status(500).send('Unable to retrieve hero, please try again')
  }
}


const saveNewVillain = async (request, response) => {
  const { name, movie, slug } = request.body

  if (!name || !movie || !slug) {
    return response.status(400).send('A name, movie, or slug must be used')
  }

  const newVillain = await models.villains.create({
    name, movie, slug
  })

  return response.status(201).send(newVillain)
}

module.exports = { getAllVillains, getVillainsBySlug, saveNewVillain }
