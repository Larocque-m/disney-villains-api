const express = require('express')
const bodyParser = require('body-parser')
const { getAllVillains, getVillainsBySlug, saveNewVillain } = require('./controller/villains')

const app = express()

app.get('/villains', getAllVillains)

app.get('/villains/:slug', getVillainsBySlug)

app.post('/villains', bodyParser.json(), saveNewVillain)

app.all('*', (request, response) => {
  return response.status(404).send('Sorry this is not working')
})

app.listen(1337, () => {
  // eslint-disable-next-line no-console
  console.log('Listening for you...')
})
