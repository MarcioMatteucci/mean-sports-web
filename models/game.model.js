const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    localTeam: {
        name: {
            type: String,
            required: true
        },
        events: [{
            type: Schema.Types.ObjectId,
            ref: 'event'
        }]
    },
    visitingTeam: {
        name: {
            type: String,
            required: true
        },
        events: [{
            type: Schema.Types.ObjectId,
            ref: 'event'
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
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

const autoPopulateEvents = function(next) {
    this.populate('localTeam.events').populate('visitingTeam.events');
    next();
};

gameSchema.pre('findOne', autoPopulateEvents).pre('find', autoPopulateEvents);

gameSchema.virtual('localTeam.goals').get(function () {
    let goals = 0;
    this.localTeam.events.forEach(event => {
        if (event.type === 'Gol') {
            goals++;
        }
    });
    return goals;
});

gameSchema.virtual('visitingTeam.goals').get(function () {
    let goals = 0;
    this.visitingTeam.events.forEach(event => {
        if (event.type === 'Gol') {
            goals++;
        }
    });
    return goals;
});

const Game = mongoose.model('game', gameSchema);

module.exports = Game;