var express = require('express')
var http = require('http')
var app = express()
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken')

var users = ['Jane', 'Matt', 'Nayeli', 'Hugo']

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({limit:'10mb'}))

app.get('/', (req, res) => {
  res.status(200).send("Welcome @hugooSoul")
})

app.get('/secure', (req, res) => {
    var token = req.headers['authorization']
    if(!token){
        res.status(401).send({
          error: "Es necesario el token de autenticación"
        })
        return
    }

    token = token.replace('Bearer ', '')

    jwt.verify(token, 'Secret Password', function(err, user) {
      if (err) {
        res.status(401).send({
          error: 'Token inválido'
        })
      } else {
        res.send({
          message: 'Hell yeah!, Token validated.'
        })
      }
    })
})

app.post('/login', (req, res) => {
  var username = req.body.user
  var password = req.body.password

  if( !(username === 'hugo' && password === '123a')){
    res.status(401).send({
      error: 'usuario o contraseña inválidos'
    })
    return
  }

  var tokenData = {
    username: username
    // ANY DATA
  }

  var token = jwt.sign(tokenData, 'Secret Password', {
     expiresIn: 60 * 60 * 24 // expires in 24 hours
  })

  res.send({
    token
  })
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
