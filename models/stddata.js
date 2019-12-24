const mongoose = require('mongoose')

let stddataSchema = new mongoose.Schema({
  regno: {type: Number, required: true},
  name: {type: String, required: true},
  dob: {type: String, required: true},
  exam_stat: {type: Number, default: 0},
  start_time: Date,
  end_time: Date,
  ans: {
    1: {type: String, default: ''}, 2: {type: String, default: ''}, 3: {type: String, default: ''}, 4: {type: String, default: ''}, 5: {type: String, default: ''},
    6: {type: String, default: ''}, 7: {type: String, default: ''}, 8: {type: String, default: ''}, 9: {type: String, default: ''}, 10: {type: String, default: ''},
    11: {type: String, default: ''}, 12: {type: String, default: ''}, 13: {type: String, default: ''}, 14: {type: String, default: ''}, 15: {type: String, default: ''},
    16: {type: String, default: ''}, 17: {type: String, default: ''}, 18: {type: String, default: ''}, 19: {type: String, default: ''}, 20: {type: String, default: ''},
    21: {type: String, default: ''}, 22: {type: String, default: ''}, 23: {type: String, default: ''}, 24: {type: String, default: ''}, 25: {type: String, default: ''},
    26: {type: String, default: ''}, 27: {type: String, default: ''}, 28: {type: String, default: ''}, 29: {type: String, default: ''}, 30: {type: String, default: ''},
    31: {type: String, default: ''}, 32: {type: String, default: ''}, 33: {type: String, default: ''}, 34: {type: String, default: ''}, 35: {type: String, default: ''},
    36: {type: String, default: ''}, 37: {type: String, default: ''}, 38: {type: String, default: ''}, 39: {type: String, default: ''}, 40: {type: String, default: ''},
    41: {type: String, default: ''}, 42: {type: String, default: ''}, 43: {type: String, default: ''}, 44: {type: String, default: ''}, 45: {type: String, default: ''},
    46: {type: String, default: ''}, 47: {type: String, default: ''}, 48: {type: String, default: ''}, 49: {type: String, default: ''}, 50: {type: String, default: ''},
    51: {type: String, default: ''}, 52: {type: String, default: ''}, 53: {type: String, default: ''}, 54: {type: String, default: ''}, 55: {type: String, default: ''},
    56: {type: String, default: ''}, 57: {type: String, default: ''}, 58: {type: String, default: ''}, 59: {type: String, default: ''}, 60: {type: String, default: ''},
    61: {type: String, default: ''}, 62: {type: String, default: ''}, 63: {type: String, default: ''}, 64: {type: String, default: ''}, 65: {type: String, default: ''},
    66: {type: String, default: ''}, 67: {type: String, default: ''}, 68: {type: String, default: ''}, 69: {type: String, default: ''}, 70: {type: String, default: ''},
    71: {type: String, default: ''}, 72: {type: String, default: ''}, 73: {type: String, default: ''}, 74: {type: String, default: ''}, 75: {type: String, default: ''}
  },
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
  activities: [String],
  mtotal: {type: Number, default: 0}
}, {strict:false})

module.exports = mongoose.model("Stddata", stddataSchema)
