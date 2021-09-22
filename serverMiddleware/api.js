const express = require('express')
const db = require('./db/models')
const app = express()

const validation = require('../utils/validation')

app.use(express.json())

db.sequelize.sync({force: true})

app.get('/url', (req, res) => {
  db.links.findAll().then(items => res.json({data: items}))
})

app.get('/url/:url', (req, res) => {
  console.log(req.params.url)
  db.links.findOne({where: {shortUrl: req.params.url}}).then(item => res.json({data: item}))
  db.links.increment('clicks', {where: {shortUrl: req.params.url}})
})

app.post('/url', (req, res) => {
  let shortUrl = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5)
  if (req?.body?.params?.originalUrl && validation.isValidURL(req?.body?.params?.originalUrl)) {
    db.links.create({
      originalUrl: req.body.params.originalUrl,
      shortUrl,
      clicks: 0
    }).then(item => res.json({data: item}))
  } else {
    res.status(400)
    res.end()
  }
})

module.exports = app
