const mongoose = require('mongoose')

let stddataSchema = new mongoose.Schema({
  regno: {type: Number, required: true},
  name: {type: String, required: true},
  dob: {type: String, required: true},
  exam_stat: {type: Number, default: 0},
  start_time: Date,
  end_time: Date,
  marks: {
    1: {type: Number, default: 0}, 2: {type: Number, default: 0}, 3: {type: Number, default: 0}, 4: {type: Number, default: 0}, 5: {type: Number, default: 0},
    6: {type: Number, default: 0}, 7: {type: Number, default: 0}, 8: {type: Number, default: 0}, 9: {type: Number, default: 0}, 10: {type: Number, default: 0},
    11: {type: Number, default: 0}, 12: {type: Number, default: 0}, 13: {type: Number, default: 0}, 14: {type: Number, default: 0}, 15: {type: Number, default: 0},
    16: {type: Number, default: 0}, 17: {type: Number, default: 0}, 18: {type: Number, default: 0}, 19: {type: Number, default: 0}, 20: {type: Number, default: 0},
    21: {type: Number, default: 0}, 22: {type: Number, default: 0}, 23: {type: Number, default: 0}, 24: {type: Number, default: 0}, 25: {type: Number, default: 0},
    26: {type: Number, default: 0}, 27: {type: Number, default: 0}, 28: {type: Number, default: 0}, 29: {type: Number, default: 0}, 30: {type: Number, default: 0},
    31: {type: Number, default: 0}, 32: {type: Number, default: 0}, 33: {type: Number, default: 0}, 34: {type: Number, default: 0}, 35: {type: Number, default: 0},
    36: {type: Number, default: 0}, 37: {type: Number, default: 0}, 38: {type: Number, default: 0}, 39: {type: Number, default: 0}, 40: {type: Number, default: 0},
    41: {type: Number, default: 0}, 42: {type: Number, default: 0}, 43: {type: Number, default: 0}, 44: {type: Number, default: 0}, 45: {type: Number, default: 0},
    46: {type: Number, default: 0}, 47: {type: Number, default: 0}, 48: {type: Number, default: 0}, 49: {type: Number, default: 0}, 50: {type: Number, default: 0},
    51: {type: Number, default: 0}, 52: {type: Number, default: 0}, 53: {type: Number, default: 0}, 54: {type: Number, default: 0}, 55: {type: Number, default: 0},
    56: {type: Number, default: 0}, 57: {type: Number, default: 0}, 58: {type: Number, default: 0}, 59: {type: Number, default: 0}, 60: {type: Number, default: 0},
    61: {type: Number, default: 0}, 62: {type: Number, default: 0}, 63: {type: Number, default: 0}, 64: {type: Number, default: 0}, 65: {type: Number, default: 0},
    66: {type: Number, default: 0}, 67: {type: Number, default: 0}, 68: {type: Number, default: 0}, 69: {type: Number, default: 0}, 70: {type: Number, default: 0},
    71: {type: Number, default: 0}, 72: {type: Number, default: 0}, 73: {type: Number, default: 0}, 74: {type: Number, default: 0}, 75: {type: Number, default: 0}
  },
  qstatus: {
    1: {type: Number, default: 0}, 2: {type: Number, default: 0}, 3: {type: Number, default: 0}, 4: {type: Number, default: 0}, 5: {type: Number, default: 0},
    6: {type: Number, default: 0}, 7: {type: Number, default: 0}, 8: {type: Number, default: 0}, 9: {type: Number, default: 0}, 10: {type: Number, default: 0},
    11: {type: Number, default: 0}, 12: {type: Number, default: 0}, 13: {type: Number, default: 0}, 14: {type: Number, default: 0}, 15: {type: Number, default: 0},
    16: {type: Number, default: 0}, 17: {type: Number, default: 0}, 18: {type: Number, default: 0}, 19: {type: Number, default: 0}, 20: {type: Number, default: 0},
    21: {type: Number, default: 0}, 22: {type: Number, default: 0}, 23: {type: Number, default: 0}, 24: {type: Number, default: 0}, 25: {type: Number, default: 0},
    26: {type: Number, default: 0}, 27: {type: Number, default: 0}, 28: {type: Number, default: 0}, 29: {type: Number, default: 0}, 30: {type: Number, default: 0},
    31: {type: Number, default: 0}, 32: {type: Number, default: 0}, 33: {type: Number, default: 0}, 34: {type: Number, default: 0}, 35: {type: Number, default: 0},
    36: {type: Number, default: 0}, 37: {type: Number, default: 0}, 38: {type: Number, default: 0}, 39: {type: Number, default: 0}, 40: {type: Number, default: 0},
    41: {type: Number, default: 0}, 42: {type: Number, default: 0}, 43: {type: Number, default: 0}, 44: {type: Number, default: 0}, 45: {type: Number, default: 0},
    46: {type: Number, default: 0}, 47: {type: Number, default: 0}, 48: {type: Number, default: 0}, 49: {type: Number, default: 0}, 50: {type: Number, default: 0},
    51: {type: Number, default: 0}, 52: {type: Number, default: 0}, 53: {type: Number, default: 0}, 54: {type: Number, default: 0}, 55: {type: Number, default: 0},
    56: {type: Number, default: 0}, 57: {type: Number, default: 0}, 58: {type: Number, default: 0}, 59: {type: Number, default: 0}, 60: {type: Number, default: 0},
    61: {type: Number, default: 0}, 62: {type: Number, default: 0}, 63: {type: Number, default: 0}, 64: {type: Number, default: 0}, 65: {type: Number, default: 0},
    66: {type: Number, default: 0}, 67: {type: Number, default: 0}, 68: {type: Number, default: 0}, 69: {type: Number, default: 0}, 70: {type: Number, default: 0},
    71: {type: Number, default: 0}, 72: {type: Number, default: 0}, 73: {type: Number, default: 0}, 74: {type: Number, default: 0}, 75: {type: Number, default: 0}
  },
  activities: [String]
}, {strict:false})

module.exports = mongoose.model("Stddata", stddataSchema)
