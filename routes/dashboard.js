const express     = require('express'),
      app         = express(),
      userFns     = require('../functions/functions'),
      multer      = require('multer'),
      path        = require('path'),
      qnDb        = require('../models/questions')

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

app.get('/', userFns.isLoggedIn,(req, res) => {
  res.render('dashboard')
})

app.get('/uploadqn', userFns.isLoggedIn, (req, res) => {
  res.render('questions')
})

app.get('/uploadqn/:subject', userFns.isLoggedIn, (req, res) => {
  res.render('subject', {subject: req.params.subject})
})

app.get('/viewqn', userFns.isLoggedIn, (req, res) => {
  res.render('viewqns')
})

app.get('/viewqn/:subject', userFns.isLoggedIn, (req, res) => {
  res.render('viewsubject', {subject: req.params.subject})
})

app.post('/qnupload', userFns.isLoggedIn, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(`Error on upload : ${err}`)
      res.redirect('/dashboard/uploadqn/error')
    }else {
      if (req.file == undefined) {
        // No file selected
        qnDb.create({
          subject: req.body.subject.toLowerCase(),
          description: req.body.question,
          option: req.body.croption,
          image: ''
        }, (err, saved) => {
          if (err) {
            res.redirect('/dashboard/uploadqn/error')
          }else {
            res.redirect('/dashboard/uploadqn/'+req.body.subject)
          }
        })
      }else {
        qnDb.create({
          subject: req.body.subject.toLowerCase(),
          description: req.body.question,
          option: req.body.croption,
          image: req.file.filename
        }, (err, saved) => {
          if (err) {
            res.redirect('/dashboard/uploadqn/error')
          }else {
            res.redirect('/dashboard/uploadqn/'+req.body.subject)
          }
        })
      }
    }
  })
})

module.exports = app
