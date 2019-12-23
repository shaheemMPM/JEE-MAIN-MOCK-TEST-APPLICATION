const mongoose = require('mongoose')

let stddataSchema = new mongoose.Schema({
  regno: {type: Number, required: true},
  name: {type: String, required: true},
  dob: {type: String, required: true},
  exam_stat: {type: Number, default: 0},
  start_time: Date,
  end_time: Date
})

module.exports = mongoose.model("Stddata", stddataSchema)
