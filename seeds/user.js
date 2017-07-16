const project = require('../config/project.config')
const mongoose = require('mongoose')
const Users = require('../models/Users')
/**
 * @see https://stackoverflow.com/questions/38138445/node3341-deprecationwarning-mongoose-mpromise
 */
mongoose.Promise = global.Promise

if (project.env === 'development') {
  mongoose.connect('mongodb://localhost/quiz')
} else {
  mongoose.connect('mongodb://heroku_7m70fbv9:10cb4sngheuhclogorf9g4snbb@ds141082.mlab.com:41082/heroku_7m70fbv9')
}

Users.remove({}, function(err) {
  if (err) {
    console.warn(err)
    return
  }

  process.exit()
})