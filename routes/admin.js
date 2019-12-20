const express     = require('express'),
      app         = express(),
      key         = require('../keys/key'),
      userFns     = require('../functions/functions'),
      userSchema = require('../models/user'),
      passport    = require('passport')

app.get('/register', userFns.isNotLoggedIn, (req, res) => {
  res.render('register')
})

app.post('/register', userFns.isNotLoggedIn, (req, res) => {
  if (req.body.key === key.accesscode) {
    let newUser = userSchema({username: req.body.username})
    newUser.isAdmin = true
    userSchema.register(newUser, req.body.password, (err, user) => {
      if (err) {
        console.log(`\n${new Date().toLocaleString()} : Error on registering admin to database ::\n${err}\n`)
        return res.render('register', {msg: err})
      }
      passport.authenticate('local')(req, res, () => {
        // req.flash("Success", "Successfully Signed Up! Nice to meet you "+req.body.username)
        res.redirect('/dashboard')
      })
    })
  }else {
    res.render('register', {msg: 'Invalid Access Code'})
  }
})

app.get('/login', userFns.isNotLoggedIn, (req, res) => {
  res.render('login')
})

app.post('/login', userFns.isNotLoggedIn, passport.authenticate('local', {
    successRedirect : '/dashboard',
    failureRedirect : '/'
  }), (req, res) => {
})

app.get('/logout', userFns.isAdminLoggedIn, (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = app
