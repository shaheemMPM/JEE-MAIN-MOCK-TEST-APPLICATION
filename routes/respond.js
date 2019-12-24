const express     = require('express'),
      app         = express(),
      userFns     = require('../functions/functions'),
      qnDb        = require('../models/questions'),
      stdDat      = require('../models/stddata')

app.post('/mark', userFns.isUserLoggedIn, (req, res) => {
  qnDb.find({qno: req.body.qno}, 'option', (err, copt) => {
    if (err) {
      console.log(`\n${new Date().toLocaleString()} : Error on Marking Answer 1.0 ::\n${err}\n`)
      res.send(`<script>alert("Server Error, Contact Invigilator")</script>`)
    }else {
      stdDat.find({regno: req.user.username}, 'qstatus', (errf, stdat) => {
        if (errf) {
          console.log(`\n${new Date().toLocaleString()} : Error on Marking Answer 1.1 ::\n${errf}\n`)
          res.send(`<script>alert("Server Error, Contact Invigilator")</script>`)
        }else {
          if (stdat[0].qstatus[req.body.qno] < 3) {
            if (copt[0].option == req.body.selopt) {
              tempMark = 4
            }else {
              tempMark = -1
            }
            let tempup = {}
            tempup['qstatus.'+req.body.qno] = 2
            tempup['ans.'+req.body.qno] = req.body.selopt
            tempup['marks.'+req.body.qno] = tempMark
            tempActivity = `${new Date().toLocaleString()}::MARK::${req.body.qno}`
            let actt = {}
            actt['activities'] = tempActivity
            stdDat.updateOne({regno: req.user.username}, { $set: tempup, $push: actt }, (erru, updt) => {
              if (erru) {
                console.log(`\n${new Date().toLocaleString()} : Error on Marking Answer 1.2 ::\n${erru}\n`)
                res.send(`<script>alert("Server Error, Contact Invigilator")</script>`)
              }else {
                console.log(tempActivity+'::'+req.user.username)
                res.redirect('/user/qn/'+(Number(req.body.qno)+1))
              }
            })
          }else {
            res.redirect('/user/qn/'+(Number(req.body.qno)+1))
          }
        }
      })
    }
  })
})

app.get('/clearmark/:id', userFns.isUserLoggedIn, (req, res) => {
  let tempup = {}
  tempup['qstatus.'+req.params.id] = 1
  tempup['ans.'+req.params.id] = ''
  tempup['marks.'+req.params.id] = 0
  tempActivity = `${new Date().toLocaleString()}::CLEAR::${req.params.id}`
  let actt = {}
  actt['activities'] = tempActivity
  stdDat.updateOne({regno: req.user.username}, { $set: tempup, $push: actt }, (erru, updt) => {
    if (erru) {
      console.log(`\n${new Date().toLocaleString()} : Error on Clering Answer 1.0 ::\n${erru}\n`)
      res.send(`<script>alert("Server Error, Contact Invigilator")</script>`)
    }else {
      console.log(tempActivity+'::'+req.user.username)
      res.redirect('/user/qn/'+req.params.id)
    }
  })
})

app.post('/save', userFns.isUserLoggedIn, (req, res) => {
  qnDb.find({qno: req.body.qno}, 'option', (err, copt) => {
    if (err) {
      console.log(`\n${new Date().toLocaleString()} : Error on Saving Answer 1.0 ::\n${err}\n`)
      res.send(`<script>alert("Server Error, Contact Invigilator")</script>`)
    }else {
      if (copt[0].option == req.body.selopt) {
        tempMark = 4
      }else {
        tempMark = -1
      }
      let tempup = {}
      tempup['qstatus.'+req.body.qno] = 3
      tempup['ans.'+req.body.qno] = req.body.selopt
      tempup['marks.'+req.body.qno] = tempMark
      tempActivity = `${new Date().toLocaleString()}::SAVE::${req.body.qno}`
      let actt = {}
      actt['activities'] = tempActivity
      stdDat.updateOne({regno: req.user.username}, { $set: tempup, $push: actt }, (erru, updt) => {
        if (erru) {
          console.log(`\n${new Date().toLocaleString()} : Error on Saving Answer 1.1 ::\n${erru}\n`)
          res.send(`<script>alert("Server Error, Contact Invigilator")</script>`)
        }else {
          console.log(tempActivity+'::'+req.user.username)
          res.redirect('/user/qn/'+(Number(req.body.qno)+1))
        }
      })
    }
  })
})

module.exports = app
