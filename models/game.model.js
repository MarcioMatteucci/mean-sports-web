const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Crear el Schema
const gameSchema = new Schema({
   name: {
        type: String,
        required: true,
        unique: true
    },teams:{
        type: [String]
    },ended:{
        type: Boolean
    },
    dateStart: {
        type: Date, default: Date.now 
    }
}, { timestamps: true });

// Crear el Modelo basado en el Schema
const Game = mongoose.model('game', gameSchema);

//Exportar el Modelo
module.exports = Game;