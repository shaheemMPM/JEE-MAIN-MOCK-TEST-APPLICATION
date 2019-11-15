const express     = require('express'),
      app         = express(),
      userFns     = require('../functions/functions')

app.get('/', userFns.isLoggedIn,(req, res) => {
  res.render('dashboard')
})

module.exports = app
