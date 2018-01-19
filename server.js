var express = require('express')
var http = require('http')
var app = express()

var users = ['Jane', 'Matt', 'Nayeli', 'Hugo']

app.get('/', (req, res) => {
  res.status(200).send("Welcome @hugooSoul")
})

app.get('/cources', (req, res) => {
  var coupon = req.query.coupon
  var source = req.query.source
  res.send("Coupo: " + coupon + ", Source: " + source)
})

app.get('/users', (req, res) => {
  res.send(users)
})

app.post('/users', (req, res) => {
  users.push('User ' + users.length)
  res.send("New user add")
})

http.createServer(app).listen(8001, () => {
  console.log('server started at http://localhost:8001')
})
