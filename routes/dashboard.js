const express     = require('express'),
      app         = express(),
      userFns     = require('../functions/functions'),
      multer      = require('multer'),
      path        = require('path'),
      qnDb        = require('../models/questions')

const groupRule = [{ $group : { _id : "$subject", total : { $sum : 1 } } }],
      dbError   = {results: [{_id: "error", total:  0}, {_id: "error", total:  0}, {_id: "error", total:  0}]}


// set storage engine
const storage = multer.diskStorage({
  destination : './public/uploads/',
  filename    : function (req, file, cb){
    let tpname = file.originalname.split(".")
    tpname = tpname[0]
    tpname = tpname + '-' + Date.now() + path.extname(file.originalname)
    cb(null,tpname)
  }
})

// initialise upload variable
const upload = multer({
  storage : storage,
  limits  : {
    fileSize : 16000000
  },
  fileFilter : function(req, file, cb) {
    checkFileType(file, cb)
  }
}).single('qnimg')

// checkFileType function definition
function checkFileType(file, cb) {
  // regular expression for image extensions
  const filetypes = /jpeg|jpg|png|gif/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetyp = filetypes.test(file.mimetype)
  if (extname && mimetyp) {
    return cb(null, true)
  } else {
    cb('Error : Images Only!')
  }
}

app.get('/', userFns.isAdminLoggedIn,(req, res) => {
  qnDb.aggregate(groupRule, (err, results) => {
      if (err) {
        res.render('dashboard', dbError)
      }else {
        res.render('dashboard', {results: results})
      }
    }
  )
})

app.get('/uploadqn', userFns.isAdminLoggedIn, (req, res) => {
  res.render('questions')
})

app.get('/uploadqn/:subject', userFns.isAdminLoggedIn, (req, res) => {
  res.render('subject', {subject: req.params.subject})
})

app.get('/viewqn', userFns.isAdminLoggedIn, (req, res) => {
  res.render('viewqns')
})

app.get('/viewqn/:subject', userFns.isAdminLoggedIn, (req, res) => {
  qnDb.find({subject: req.params.subject}, '-__v -subject',(err, data) => {
    if (err) {
      res.render('viewsubject', {subject: req.params.subject, msg: err, data: []})
    }else {
      res.render('viewsubject', {subject: req.params.subject, data: data, msg: ''})
    }
  })
})

app.post('/qnupload', userFns.isAdminLoggedIn, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(`Error on upload : ${err}`)
      res.redirect('/dashboard/uploadqn/error')
    }else {
      if (req.file == undefined) {
        // No file selected
        qnDb.create({
          subject: req.body.subject,
          qno: req.body.qno,
          description: req.body.question,
          qtype: req.body.qntype,
          option: req.body.croption,
          image: ''
        }, (err, saved) => {
          if (err) {
            console.log(req.body)
            console.log(`\n${new Date().toLocaleString()} : Error on qn upload to db without image ::\n${err}\n`)
            res.redirect('/dashboard/uploadqn/error')
          }else {
            res.redirect('/dashboard/uploadqn/'+req.body.subject)
          }
        })
      }else {
        qnDb.create({
          subject: req.body.subject,
          qno: req.body.qno,
          description: req.body.question,
          qtype: req.body.qntype,
          option: req.body.croption,
          image: req.file.filename
        }, (err, saved) => {
          if (err) {
            console.log(`\n${new Date().toLocaleString()} : Error on qn upload to db with image ::\n${err}\n`)
            res.redirect('/dashboard/uploadqn/error')
          }else {
            res.redirect('/dashboard/uploadqn/'+req.body.subject)
          }
        })
      }
    }
  })
})

app.get('/delqn/:subject/:qnid', userFns.isAdminLoggedIn, (req, res) => {
  qnDb.deleteOne({ _id: req.params.qnid }, (err) => {
    if (err) {
      console.log(`Error on removing single question from db : ${err}`)
    }
    res.redirect('/dashboard/viewqn/'+req.params.subject)
  })
})

app.get('/clearqndb/:subject', userFns.isAdminLoggedIn, (req, res) => {
  qnDb.deleteMany({subject: req.params.subject}, (erdb) => {
    if (erdb) {
      console.log(`Error on Clearing DB : ${erdb}`)
    }
    res.redirect('/dashboard/viewqn')
  })
})

module.exports = app
