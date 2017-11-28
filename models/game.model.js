const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    localTeam: {
        name: {
            type: String,
            required: true
        },
        goals: {
            type: Number,
            required: false,
            default: 0
        }
    },
    visitingTeam: {
        name: {
            type: String,
            required: true
        },
        goals: {
            type: Number,
            required: false,
            default: 0
        }
    },
    start: {
        isStarted: {
            type: Boolean,
            required: true,
            default: false
        },
        startedAt: {
            type: Date,
            required: false
        }
    },
    finish: {
        isFinished: {
            type: Boolean,
            required: true,
            default: false
        },
        finishedAt: {
            type: Date,
            required: false
        }
    },
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'event'
    }],
}, { timestamps: true });

const Game = mongoose.model('game', gameSchema);

module.exports = Game;