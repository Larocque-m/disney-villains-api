const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const {
  after, before, beforeEach, describe, it
} = require('mocha')
const { getAllVillains, getVillainsBySlug, saveNewVillain } = require('../../controllers/villains')
const models = require('../../models')
const { singleVillain, postedVillain, villainsList } = require('../mocks/villains')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - villains', () => {
  let sandbox
  let stubbedFindOne
  let stubbedFindAll
  let stubbedSend
  let response
  let stubbedSendStatus
  let stubbedStatusSend
  let stubbedStatus
  let stubbedCreate

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedFindOne = sandbox.stub(models.Villains, 'findOne')
    stubbedFindAll = sandbox.stub(models.Villains, 'findAll')
    stubbedCreate = sandbox.stub(models.Villains, 'create')

    stubbedSend = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    stubbedStatusSend = sandbox.stub()
    stubbedStatus = sandbox.stub()

    response = {
      send: stubbedSend,
      sendStatus: stubbedSendStatus,
      status: stubbedStatus,
    }
  })

  beforeEach(() => {
    stubbedStatus.returns({ send: stubbedStatusSend })
  })

  after(() => {
    sandbox.reset()
  })



  describe('getAllVillains', () => {
    it('retrieves a list of heroes from the database and calls response.send() with the list', async () => {
      const stubbedFindAll = sinon.stub(models.Villains, 'findAll').returns(villainsList)

      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }

      await getAllVillains({}, response)
      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(villainsList)
    })
    it('returns a 500 if database call fails', async () => {
      stubbedFindAll.throws('ERROR!')

      await getAllVillains({}, response)

      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusSend).to.have.been.calledWith('Unable to retrieve villains, please try again')
    })
  })
  describe('getVillainsBySlug', () => {
    // eslint-disable-next-line max-len
    it('it retrieves the hero associated with the provided slug from the database and calls response.send with it', async () => {
      const request = { params: { slug: 'scar' } }
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }
      const stubbedFindOne = sinon.stub(models.Villains, 'findOne').returns(singleVillain)

      await getVillainsBySlug(request, response)
      expect(stubbedFindOne).to.have.been.calledWith({
        attributes: ['name', 'movie', 'slug'],
        where: { slug: 'scar' }
      })
      expect(stubbedSend).to.have.been.calledWith(singleVillain)
    })
    it('returns a 404 when no villain is found', async () => {
      stubbedFindOne.returns(null)
      const request = { params: { slug: 'not-found' } }

      await getVillainsBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        attributes: ['name', 'movie', 'slug'],
        where: { slug: 'not-found' }
      })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })

    it('returns a 500 with an error message when the database call throws an error', async () => {
      stubbedFindOne.throws('ERROR!')
      const request = { params: { slug: 'throw-error' } }

      await getVillainsBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        attributes: ['name', 'movie', 'slug'],
        where: { slug: 'throw-error' }
      })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusSend).to.have.been.calledWith('Unable to retrieve villain, please try agin')
    })
  })

  describe('saveNewVillain', () => {
    // eslint-disable-next-line max-len
    it('accepts new hero details and saves them as a new hero, returning the saved record with a 201 status', async () => {
      const request = { body: postedVillain }
      const stubbedSend = sinon.stub()
      const response = { status: stubbedSend }
      const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
      const stubbedCreate = sinon.stub(models.Villains, 'create').returns(singleVillain)



      await saveNewVillain(request, response)
      expect(stubbedCreate).to.have.been.calledWith(postedVillain)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedSend).to.have.been.calledWith(singleVillain)
    })
    it('returns a 400 status when all required fields are not provided', async () => {
      const { name, movie } = postedVillain
      const request = { body: { name, movie } }

      await saveNewVillain(request, response)

      expect(stubbedCreate).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusSend).to.have.been.calledWith('Required fields: name, movie, slug')
    })
    it('returns a 500 status when an error occurs saving the new villain', async () => {
      const request = { body: postedVillain }

      stubbedCreate.throws('ERROR!')

      await saveNewVillain(request, response)

      expect(stubbedCreate).to.have.been.calledWith(postedVillain)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusSend).to.have.been.calledWith('Unable to add villain, please try again')
    })
  })
})
