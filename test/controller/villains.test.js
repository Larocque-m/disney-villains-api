const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { describe, it } = require('mocha')
const { getAllVillains, getVillainBySlug, saveNewVillain } = require('../../controllers/villains')
const models = require('../../models')
const { singleVillain, postedVillain, villainsList } = require('../mocks/villains')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - Villains', () => {
  describe('getAllVillains', () => {
    it('retrieves a list of heroes from the database and calls response.send() with the list', async () => {
      const stubbedFindAll = sinon.stub(models.heroes, 'findAll').returns(villainsList)

      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }

      await getAllVillains({}, response)
      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(villainsList)
    })
  })
  describe('getVillainsBySlug', () => {
    // eslint-disable-next-line max-len
    it('it retrieves the hero associated with the provided slug from the database and calls response.send with it', async () => {
      const request = { params: { slug: 'search' } }
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }
      const stubbedFindOne = sinon.stub(models.Villains, 'findOne').returns(singleVillain)

      await getVillainBySlug(request, response)
      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'iron-man' } })
      expect(stubbedSend).to.have.been.calledWith(singleVillain)
    })
  })

  describe('saveNewVillain', () => {
    // eslint-disable-next-line max-len
    it('accepts new hero details and saves them as a new hero, returning the saved record with a 201 status', async () => {
      const request = {} 
      const response = {}
    })
  })
})
