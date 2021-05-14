const express = require('express')
const bodyParser = require('body-parser')
const { getAllVillains, getVillainBySlug, saveNewVillain } = require('./controller/teams')

const app = express()

app.get('/villains', getAllVillains)

app.get('/villains/:search', getVillainBySlug)

app.post('/', bodyParser.json(), saveNewVillain)
