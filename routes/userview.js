const express     = require('express'),
      app         = express(),
      userFns     = require('../functions/functions'),
      passport    = require('passport'),
      qnDb        = require('../models/questions'),
      stdDat      = require('../models/stddata')

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

app.post('/startexam', userFns.isUserLoggedIn, (req, res) => {
  stdDat.find({regno: req.user.username}, 'exam_stat', (emrr, ress) => {
    if (emrr) {
      console.log(`\n${new Date().toLocaleString()} : Error on finding question 1.0 ::\n${err}\n`)
      res.send(`<script>alert("Server Error, Contact Invigilator")</script>`)
    }else {
      // if (ress[0].exam_stat == 0) {
        qnDb.find({qno: 1}, '-__v -option', (err, results) => {
          if (err) {
            console.log(`\n${new Date().toLocaleString()} : Error on finding question 1.1 ::\n${err}\n`)
            res.send(`<script>alert("Server Error, Contact Invigilator")</script>`)
          }else {
            stdDat.updateOne({regno: req.user.username}, { $set: { exam_stat: 1, start_time: new Date, 'qstatus.1': 1}}, (erru, upd) => {
              if (erru) {
                console.log(`\n${new Date().toLocaleString()} : Error on finding question 1.2 ::\n${erru}\n`)
                res.send(`<script>alert("Server Error, Contact Invigilator")</script>`)
              }else {
                stdDat.find({regno: req.user.username}, 'regno name start_time qstatus ans', (ermr, rses) => {
                  if (ermr) {
                    console.log(`\n${new Date().toLocaleString()} : Error on finding question 1.3 ::\n${ermr}\n`)
                    res.send(`<script>alert("Server Error, Contact Invigilator")</script>`)
                  }else {
                    console.log(`${new Date().toLocaleString()} : ${req.user.username} Started Exam`)
                    res.render('examqn', {data: results[0], user: rses[0]})
                  }
                })
              }
            })
          }
        })
      // }else {
        // res.send(`<script>alert("User Already Taken Exam")</script>`)
      // }
    }
  })
})

app.get('/qn/:id', userFns.isUserLoggedIn, (req, res) => {
  if (req.params.id <= 75) {
    qnDb.find({qno: req.params.id}, '-__v -option', (err, results) => {
      if (err) {
        console.log(`\n${new Date().toLocaleString()} : Error on finding question 2.0 ::\n${err}\n`)
        res.send(`<script>alert("Server Error, Contact Invigilator")</script>`)
      }else {
        stdDat.find({regno: req.user.username}, 'qstatus', (erfr, fqst) => {
          if (erfr) {
            console.log(`\n${new Date().toLocaleString()} : Error on finding question 2.1 ::\n${err}\n`)
            res.send(`<script>alert("Server Error, Contact Invigilator")</script>`)
          }else {
            let temp = {}
            if (fqst[0].qstatus[req.params.id] == 0) {
              temp['qstatus.'+req.params.id] = 1
            }
            stdDat.updateOne({regno: req.user.username}, { $set: temp}, (erru, ress) => {
              if (erru) {
                console.log(`\n${new Date().toLocaleString()} : Error on finding question 2.2 ::\n${erru}\n`)
                res.send(`<script>alert("Server Error, Contact Invigilator")</script>`)
              }else {
                stdDat.find({regno: req.user.username}, 'regno name start_time qstatus ans', (ermr, rses) => {
                  if (ermr) {
                    console.log(`\n${new Date().toLocaleString()} : Error on finding question 2.3 ::\n${ermr}\n`)
                    res.send(`<script>alert("Server Error, Contact Invigilator")</script>`)
                  }else {
                    res.render('examqn', {data: results[0], user: rses[0]})
                  }
                })
              }
            })
          }
        })
      }
    })
  }else {
    res.redirect('/user/qn/75')
  }
})

app.get('/finish/:id', userFns.isUserLoggedIn, (req, res) => {
  if (req.params.id === '03026bbc133714df') {
    let tmark = 0
    stdDat.find({regno: req.user.username}, 'marks', (err, fnd) => {
      if (err) {
        console.log(`\n${new Date().toLocaleString()} : Error on finishing exam 1.0 ::\n${erru}\n`)
        res.send(`<script>alert("Server Error, Contact Invigilator")</script>`)
      }else {
        for (var i = 1; i <= 75; i++) {
          tmark += fnd[0].marks[i]
        }
        console.log(`Total Mark of ${req.user.username} : ${tmark}`)
        stdDat.updateOne({regno: req.user.username}, { $set: { exam_stat: 2, end_time: new Date, mtotal: tmark }}, (erru, upd) => {
          if (erru) {
            console.log(`\n${new Date().toLocaleString()} : Error on finishing exam 1.1 ::\n${erru}\n`)
            res.send(`<script>alert("Server Error, Contact Invigilator")</script>`)
          }else {
            console.log(`${new Date().toLocaleString()} : ${req.user.username} Finished Exam`)
            req.logout()
            res.redirect('/user/login')
          }
        })
      }
    })
  }else {
    console.log(`\n${new Date().toLocaleString()} : XSS Attack Detected\nIP of Attacker : ${req.connection.remoteAddress}\nUser: ${req.user.username}\n`)
    stdDat.updateOne({regno: req.user.username}, { $set: { exam_stat: 3, end_time: new Date }}, (erru, upd) => {
      if (erru) {
        console.log(`\n${new Date().toLocaleString()} : Error on finishing exam 1.2 ::\n${erru}\n`)
        res.send(`<script>alert("You Are Disqualified due to un autherised XSS Activity")</script>`)
      }else {
        req.logout()
        res.send(`<script>alert("You Are Disqualified due to un autherised XSS Activity")</script>`)
      }
    })
  }
})

app.get('/logout', userFns.isUserLoggedIn, (req, res) => {
  req.logout()
  res.redirect('/user/login')
})

module.exports = app
