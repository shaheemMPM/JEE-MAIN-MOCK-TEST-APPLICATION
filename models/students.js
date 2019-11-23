const mongoose              = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose')

let stdSchema = new mongoose.Schema({
  username: {type: String, unique : true, required : true, dropDups: true},
  password: {type: String}
})

stdSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("Student", stdSchema)
