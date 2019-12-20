const express = require('express'),
      app     = express(),
      userFns = require('../functions/functions'),
      stData  = require('../models/stddata')

app.get('/createstd', userFns.isAdminLoggedIn, (req, res) => {
  res.render('students', {data: []})
  // stData.find({}, (err, results) => {
  //   if (err) {
  //     console.log(`Error on rendering student page data : ${err}`)
  //     res.render('students', {data: []})
  //   }else {
  //     res.render('students', {data: results})
  //   }
  // })
})

app.post('/createstd', userFns.isAdminLoggedIn, (req, res) => {

})

app.get('/delelte/:stdid', userFns.isAdminLoggedIn, (req, res) => {

})

app.get('/clearstudents', userFns.isAdminLoggedIn, (req, res) => {

})

module.exports = app
