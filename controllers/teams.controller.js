const Team = require('../models/team.model');
const validator = require('../helpers/validations');

module.exports = {
   getAllTeams: async (req, res, next) => {
      // Todos los datos de la colleccion
      const teams = await Team.find();

      res.status(200).json({ success: true, teams: teams });
   },

   getTeamById: async (req, res, next) => {
      // Datos
      const id = await req.params.id;

      // Validar que se pase el id
      if (validator.isEmpty(id)) {
         return res.status(400).json({ success: false, msg: 'No se ha proveido el ID del Equipo' });
      }

      // Buscar team
      const team = await Team.findById(id, (err) => {
         if (err) {
            return res.status(404).json({ success: false, msg: 'No se ha encontrado Equipo con ese ID' });
         }
      });

      res.status(200).json({ success: true, team: team });
   },

   createTeam: async (req, res, next) => {
      // Datos del body
      const name = await req.body.name;

      // Validar datos del body
      if (validator.isEmpty(name)) {
         return res.status(400).json({ success: false, msg: 'El campo Nombre es requerido' });
      }

      // Validar que el team no exista
      const sameNameTeam = await Team.findOne({ name: name });
      if (sameNameTeam) {
         return res.status(403).json({ success: false, msg: 'El Equipo ya existe' });
      }

      // Crear nuevo Team con los datos del body
      const newTeam = new Team({
         name: name
      });

      // Persistencia del nuevo Team
      await newTeam.save();

      // Success response (si todo va bien)
      res.status(201).json({ success: true, msg: 'Equipo creado', team: newTeam });
   }
}