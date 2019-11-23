const express = require('express'),
      app     = express(),
      userFns = require('../functions/functions'),
      stdDb   = require('../models/students'),
      stData  = require('../models/stddata')

app.get('/createstd', userFns.isLoggedIn, (req, res) => {
  stData.find({}, (err, results) => {
    if (err) {
      console.log(`Error on rendering student page data : ${err}`)
      res.render('students', {data: []})
    }else {
      res.render('students', {data: results})
    }
  })
})

app.post('/createstd', userFns.isLoggedIn, (req, res) => {
  stdDb.register(new stdDb({username: req.body.regno}), req.body.dob, (err, stud) => {
    if (err) {
      console.log(`Error on student registering : ${err}`)
      return res.redirect('/student/createstd')
    }else {
      stData.create({
        regno: req.body.regno,
        name: req.body.fname,
        dob: req.body.dob
      }, (err, final) => {
        if (err) {
          console.log(`Error on storing student data to DB : ${err}`)
          return res.redirect('/student/createstd')
        }else {
          return res.redirect('/student/createstd')
        }
      })
    }
  })
})

app.get('/delelte/:stdid', (req, res) => {
  stData.find({_id: req.params.stdid}, (err, find) => {
    if (err) {
      console.log(`Error on finding std data while trying to delete std : ${err}`)
      res.redirect('/student/createstd')
    }else {
      console.log(find[0].regno)
      stdDb.deleteOne({username: find[0].regno}, (errm) => {
        if (errm) {
          console.log(`Error while trying to delete student meta : ${errm}`)
          res.redirect('/student/createstd')
        }else {
          stData.deleteOne({_id: req.params.stdid}, (errd) => {
            if (errd) {
              console.log(`Error while trying to delete student data : ${errd}`)
              res.redirect('/student/createstd')
            }else {
              res.redirect('/student/createstd')
            }
          })
        }
      })
    }
  })
})

app.get('/clearstudents', (req, res) => {
  stData.deleteMany({}, (err) => {
    if (err) {
      console.log(`Error while trying to clear std data db : ${err}`)
      res.redirect('/student/createstd')
    }else {
      stdDb.deleteMany({}, (errm) => {
        if (errm) {
          console.log(`Error while trying to clear std meta db : ${errm}`)
          res.redirect('/student/createstd')
        }else {
          res.redirect('/student/createstd')
        }
      })
    }
  })
})

module.exports = app
