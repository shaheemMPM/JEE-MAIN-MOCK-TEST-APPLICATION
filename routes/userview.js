const express = require('express'),
      app     = express(),
      userFns = require('../functions/functions'),
      passport    = require('passport'),
      qnDb        = require('../models/questions')

app.get('/login', userFns.isNotLoggedIn, (req, res) => {
  res.render('stdlogin')
})

app.post('/login', userFns.isNotLoggedIn, passport.authenticate('local', {
    successRedirect : '/user/window',
    failureRedirect : '/user/login'
  }), (req, res) => {
})

app.get('/window', userFns.isUserLoggedIn, (req, res) => {
  res.render("studentst")
})

app.get('/qn/:id', userFns.isUserLoggedIn, (req, res) => {
  qnDb.find({qno: req.params.id}, '-__v -subject -option', (err, results) => {
    if (err) {
      console.log(`\n${new Date().toLocaleString()} : Error on registering student to database ::\n${err}\n`)
      res.send("Server Error Contact Invigilator")
    }else {
      res.render('examqn', {data: results[0]})
    }
  })
})

app.get('/logout', userFns.isUserLoggedIn, (req, res) => {
  req.logout()
  res.redirect('/user/login')
})

module.exports = app
