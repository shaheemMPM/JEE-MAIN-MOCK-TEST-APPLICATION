// Requiring essential packages
const express               = require('express'),
      app                   = express(),
      adminRoutes           = require('./routes/admin'),
      bodyParser            = require('body-parser'),
      mongoose              = require('mongoose'),
      passport              = require('passport'),
      localStratergy        = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose'),
      userFns               = require('./functions/functions'),
      adminSchema           = require('./models/admin'),
      dashboardRoutes       = require('./routes/dashboard')


// Connecting Database
mongoose.connect('mongodb://localhost/insight', {useNewUrlParser: true, useUnifiedTopology: true})

// setting view engine
app.set('view engine', 'ejs')
// setting public folder as accessible to anyone
app.use(express.static('public'))
// setting bodyParser for taking data from request body in POST requests
app.use(bodyParser.urlencoded({extended: true}))
// setting up session management
app.use(require('express-session')({
  secret: 'Ruby is the best language to code',
  resave: false,
  saveUninitialized: false
}))
// setting up passport
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStratergy(adminSchema.authenticate()))
passport.serializeUser(adminSchema.serializeUser())
passport.deserializeUser(adminSchema.deserializeUser())

// Setting up routes
app.use('/', adminRoutes)
app.use('/dashboard', dashboardRoutes)

// Activating server
const port = process.env.PORT || 3000
app.listen(port, userFns.startServer(port))
