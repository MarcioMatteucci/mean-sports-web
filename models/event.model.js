const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    team: {
        type: String // 'local' | 'visiting'
        //required: true
        // tal vez no sea requerido si el evento puede ser global del partido
    },
    game : {
        type: Schema.Types.ObjectId,
        ref: 'game'
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
    },
    eventAt: {
        type: Date,
        required: true
    }
}, { timestamps: true });

const Event = mongoose.model('event', eventSchema);

module.exports = Event;