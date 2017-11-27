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
            },
            isOwnGoal: { //gol en contra, solo si typeEvent === 'goal', player1 es del equipo contrario
                type: Boolean,
                required: false
            },
            eventAt: {
                type: Date,
                required: true
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
                required: true
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