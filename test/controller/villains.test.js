const chai = require('chai')
const { createSandbox } = require('sinon')
const sinonChai = require('sinon-chai')
const {
  after, afterEach, before, beforeEach, describe, it
} = require('mocha')
const { getAllVillains, getVillainsBySlug, saveNewVillain } = require('../../controllers/villains')
const models = require('../../models')
const { singleVillain, postedVillain, villainsList, postedVillainResponse } = require('../mocks/villains')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - villains', () => {
  let sandbox
  let stubbedFindAll
  let stubbedSend
  let stubbedCreate
  let stubbedFindOne
  let response
  let stubbedSendStatus
  let stubbedStatus
  let stubbedStatusDotSend

  before(() => {
    sandbox = createSandbox()

    stubbedCreate = sandbox.stub(models.Villains, 'create')
    stubbedFindAll = sandbox.stub(models.Villains, 'findAll')
    stubbedFindOne = sandbox.stub(models.Villains, 'findOne')

    stubbedSend = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    stubbedStatus = sandbox.stub()
    stubbedStatusDotSend = sandbox.stub()

    response = {
      send: stubbedSend,
      sendStatus: stubbedSendStatus,
      status: stubbedStatus,
    }
  })

  beforeEach(() => {
    stubbedStatus.returns({ send: stubbedStatusDotSend })
  })

  afterEach(() => {
    sandbox.reset()
  })

  after(() => {
    sandbox.restore()
  })


  describe('getAllVillains', () => {
    it('retrieves a list of villains from the database and calls response.send() with the list', async () => {
      stubbedFindAll.returns(villainsList)

      await getAllVillains({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(villainsList)
    })
    it('returns a 500 if database call fails', async () => {
      stubbedFindAll.throws('ERROR!')

      await getAllVillains({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve villains, please try again')
    })
  })
  describe('getVillainsBySlug', () => {
    // eslint-disable-next-line max-len
    it('it retrieves the villain associated with the provided slug from the database and calls response.send with it', async () => {
      stubbedFindOne.returns(singleVillain)
      const request = { params: { slug: 'queen-of-hearts' } }

      await getVillainsBySlug(request, response)
      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'queen-of-hearts' } })
      expect(stubbedSend).to.have.been.calledWith(singleVillain)
    })
    it('returns a 404 when no villain is found', async () => {
      stubbedFindOne.returns(null)
      const request = { params: { slug: 'not-found' } }

      await getVillainsBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'not-found' } })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })

    it('returns a 500 with an error message when the database call throws an error', async () => {
      stubbedFindOne.throws('ERROR!')
      const request = { params: { slug: 'throw-error' } }

      await getVillainsBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'throw-error' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve villains, please try again')
    })
  })

  describe('saveNewVillain', () => {
    // eslint-disable-next-line max-len
    it('accepts new villain details and saves them as a new villain, returning the saved record with a 200 status', async () => {
      stubbedCreate.returns(postedVillainResponse)

      const request = { body: postedVillain }

      await saveNewVillain(request, response)

      expect(stubbedCreate).to.have.been.calledWith(postedVillain)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusDotSend).to.have.been.calledWith(postedVillainResponse)
    })
    it('returns a 400 status when all required fields are not provided', async () => {
      const request = { body: { name: postedVillain.name, slug: postedVillain.slug } }

      await saveNewVillain(request, response)

      expect(stubbedCreate).to.have.been.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('A name, movie, or slug must be used')
    })

    it('returns a 500 status when an error occurs saving the new villain', async () => {
      stubbedCreate.throws('ERROR!')

      const request = { body: postedVillain }

      await saveNewVillain(request, response)

      expect(stubbedCreate).to.have.been.calledWith(postedVillain)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to create villains, please try again')
    })
  })
})
