var express = require('express')
var http = require('http')
var app = express()
var bodyParser = require('body-parser');

var users = ['Jane', 'Matt', 'Nayeli', 'Hugo']

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send("Welcome @hugooSoul")
})

app.get('/courses', (req, res) => {
  var coupon = req.query.coupon
  var source = req.query.source
  res.send("Coupon: " + coupon + ", Source: " + source)
})

app.get('/users', (req, res) => {
  res.send(users)
})

app.post('/users', (req, res) => {
  users.push(req.body.firstname + " " + req.body.lastname)
  res.send("New user add" + "=>" + req.body.firstname + " " + req.body.lastname)
})

app.patch('/users',(req, res) => {
  res.send('PATCH method')
})

app.delete('/users',(req, res) => {
  res.send('DELETE method')
})

http.createServer(app).listen(8001, () => {
  console.log('server started at http://localhost:8001')
})
