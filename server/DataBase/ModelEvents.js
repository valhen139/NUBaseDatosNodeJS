const mongoose = require('mongoose')

const Schema = mongoose.Schema

let EventSchema = new Schema({
    user: { type: String, required: true},
  title: { type: String, required: true },
  start: { type: String, required: true},
  end: { type: String, required: false },
})

let EventModel = mongoose.model('events', EventSchema)

module.exports = EventModel