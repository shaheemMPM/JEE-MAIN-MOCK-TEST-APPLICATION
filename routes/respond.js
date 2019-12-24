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
          console.log(`\n${new Date().toLocaleString()} : Error on Marking Answer 1.1 ::\n${err}\n`)
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
            tempActivity = `MARK::${req.body.qno}::${new Date().toLocaleString()}`
            let actt = {}
            actt['activities'] = tempActivity
            stdDat.updateOne({regno: req.user.username}, { $set: tempup, $push: actt }, (erru, updt) =>{
              if (erru) {
                console.log(`\n${new Date().toLocaleString()} : Error on Marking Answer 1.2 ::\n${err}\n`)
                res.send(`<script>alert("Server Error, Contact Invigilator")</script>`)
              }else {
                console.log(tempActivity)
                res.redirect('/user/qn/'+(Number(req.body.qno)+1))
              }
            })
          }else {
            res.redirect('/user/qn/'+req.body.qno+1)
          }
        }
      })
    }
  })
})

module.exports = app
