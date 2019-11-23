const mongoose = require('mongoose')

let stddataSchema = new mongoose.Schema({
  regno: {type: Number, required: true},
  name: {type: String, required: true},
  dob: {type: String, required: true}
})

module.exports = mongoose.model("Stddata", stddataSchema)
