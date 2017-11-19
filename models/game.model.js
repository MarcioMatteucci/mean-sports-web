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
        },
        events: [{
            typeEvent: {
                type: String,
                required: false
            },
            player1: {
                type: String,
                required: false
            },
            player2: {
                type: String,
                required: false
            }
        }]
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
        },
        events: [{
            typeEvent: {
                type: String,
                required: false
            },
            player1: {
                type: String,
                required: false
            },
            player2: {
                type: String,
                required: false
            }
        }]
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
    }
}, { timestamps: true });

const Game = mongoose.model('game', gameSchema);

module.exports = Game;