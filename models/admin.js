const mongoose              = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose')

let adminSchema = new mongoose.Schema({
  username: {type: String, unique : true, required : true, dropDups: true},
  password: {type: String}
})

adminSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("Admin", adminSchema)
