const express = require('express')
const bodyParser = require('body-parser')
const { getAllVillains, getVillainsBySlug, saveNewVillain } = require('./controller/villains')

const app = express()

app.get('/villains', getAllVillains)

app.get('/villains/:slug', getVillainsBySlug)

app.post('/', bodyParser.json(), saveNewVillain)

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening for you...')
})
