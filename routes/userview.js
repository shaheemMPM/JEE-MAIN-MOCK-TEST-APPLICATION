const express = require('express'),
      app     = express(),
      userFns = require('../functions/functions'),
      passport    = require('passport')

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
  res.render('examqn')
})

app.get('/logout', userFns.isUserLoggedIn, (req, res) => {
  req.logout()
  res.redirect('/user/login')
})

module.exports = app
