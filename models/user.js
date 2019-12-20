const mongoose              = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose')

let userSchema = new mongoose.Schema({
  username: {type: String, unique : true, required : true, dropDups: true},
  password: {type: String},
  isAdmin : {type: Boolean, default: false}
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("Admin", userSchema)
