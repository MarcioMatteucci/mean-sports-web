const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    type: {
        type: String,
        enum: ['Gol', 'Amonestación', 'Expulsión', 'Sustitución'],
        required: true,
        index: false
    },
    player1: {
        type: String,
        required: false
    },
    player2: {
        type: String,
        required: false
    },
    isOwnGoal: { //gol en contra, solo si typeEvent === 'goal', player1 es del equipo contrario
        type: Boolean,
        required: false
    }
}, { timestamps: true });

const Event = mongoose.model('event', eventSchema);

module.exports = Event;