const express     = require('express'),
      app         = express(),
      userFns     = require('../functions/functions'),
      bodyParser  = require('body-parser')


// setting bodyParser for taking data from request body in POST requests
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', userFns.isLoggedIn,(req, res) => {
  res.render('dashboard')
})

app.get('/uploadqn', userFns.isLoggedIn, (req, res) => {
  res.render('questions')
})

app.get('/uploadqn/:subject', userFns.isLoggedIn, (req, res) => {
  res.render('subject', {subject: req.params.subject})
})

app.get('/viewqn', userFns.isLoggedIn, (req, res) => {
  res.render('viewqns')
})

app.get('/viewqn/:subject', userFns.isLoggedIn, (req, res) => {
  res.render('viewsubject', {subject: req.params.subject})
})

app.post('/qnupload', userFns.isLoggedIn, (req, res) => {
  console.log(req);
  res.send(req.body)
})

module.exports = app
