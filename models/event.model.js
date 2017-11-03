const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
   type: {
      type: String,
      required: true,
      unique: true
   }
}, { timestamps: true });

const Event = mongoose.model('event', eventSchema);

module.exports = Event;