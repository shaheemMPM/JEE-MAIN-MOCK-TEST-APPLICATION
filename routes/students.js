const express = require('express'),
      app     = express(),
      userFns = require('../functions/functions'),
      userSchema = require('../models/user'),
      stData  = require('../models/stddata')

app.get('/createstd', userFns.isAdminLoggedIn, (req, res) => {
  stData.find({}, (err, results) => {
    if (err) {
      console.log(`Error on rendering student page data : ${err}`)
      res.render('students', {data: []})
    }else {
      res.render('students', {data: results})
    }
  })
})

app.post('/createstd', userFns.isAdminLoggedIn, (req, res) => {
  let newUser = userSchema({username: req.body.regno})
  userSchema.register(newUser, req.body.dob, (err, user) => {
    if (err) {
      console.log(`\n${new Date().toLocaleString()} : Error on registering student to database ::\n${err}\n`)
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

app.get('/delelte/:stdid', userFns.isAdminLoggedIn, (req, res) => {
  stData.find({_id: req.params.stdid}, (err, find) => {
    if (err) {
      console.log(`Error on finding std data while trying to delete std : ${err}`)
      res.redirect('/student/createstd')
    }else {
      console.log(find[0].regno)
      userSchema.deleteOne({username: find[0].regno}, (errm) => {
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

app.get('/clearstudents', userFns.isAdminLoggedIn, (req, res) => {
  stData.deleteMany({}, (err) => {
    if (err) {
      console.log(`Error while trying to clear std data db : ${err}`)
      res.redirect('/student/createstd')
    }else {
      userSchema.deleteMany({isAdmin: false}, (errm) => {
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

app.get('/moniter', userFns.isAdminLoggedIn, (req, res) => {
  stData.find({}, (err, results) => {
    if (err) {
      console.log(`Error on rendering student page data : ${err}`)
      res.render('monitor', {data: []})
    }else {
      res.render('monitor', {data: results})
    }
  })
})

module.exports = app
