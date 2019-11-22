const mongoose = require('mongoose')

let questionSchema = new mongoose.Schema({
  subject: {type: String, required: true},
  description: {type: String, required: true},
  option: {type: String, required: true},
  image: String
})

module.exports = mongoose.model("Questions", questionSchema)
