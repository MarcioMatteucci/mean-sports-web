const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Crear el Schema
const teamSchema = new Schema({
   name: {
      type: String,
      required: true,
      unique: true
   }
}, { timestamps: true });

// Crear el Modelo basado en el Schema
const Team = mongoose.model('team', teamSchema);

//Exportar el Modelo
module.exports = Team;