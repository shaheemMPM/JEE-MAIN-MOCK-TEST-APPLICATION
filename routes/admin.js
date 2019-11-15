const express     = require('express'),
      app         = express(),
      key         = require('../keys/key'),
      userFns     = require('../functions/functions'),
      adminSchema = require('../models/admin'),
      passport    = require('passport')

app.get('/', userFns.isNotLoggedIn,(req, res) => {
  res.redirect('/login')
})

app.get('/register', userFns.isNotLoggedIn,(req, res) => {
  res.render('register')
})

app.post('/register', (req, res) => {
  if (req.body.key === key.accesscode) {
    adminSchema.register(new adminSchema({username: req.body.username}), req.body.password, (err, user) => {
      if (err) {
        console.log(`\n${new Date().toLocaleString()} : Error on registering admin to database ::\n${err}\n`)
        return res.render('register', {msg: err})
      }
      passport.authenticate('local')(req, res, () => {
        res.redirect('/dashboard')
      })
    })
  }else {
    res.render('register', {msg: 'Invalid Access Code'})
  }
})

app.get('/login', userFns.isNotLoggedIn,(req, res) => {
  res.render('login')
})

app.post('/login', passport.authenticate('local', {
    successRedirect : '/dashboard',
    failureRedirect : '/'
  }), (req, res) => {
})

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = app
