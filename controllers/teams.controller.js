const { check, validationResult } = require('express-validator/check');

const Team = require('../models/team.model');

module.exports = {
  /* ==============
    Get All Teams
  ============== */
  getAllTeams: async (req, res, next) => {

    const name = await req.query.name;

    if (name) {
      // Buscar team
      await Team.findOne({ name: name }, (err, team) => {
        if (err) {
          return res.status(500).json({ success: false, msg: err });
        }

        if (!team) {
          return res.status(200).json({ success: false, msg: 'No se ha encontrado Equipo con ese Nombre' });
        }

        res.status(200).json({ success: true, team: team });
      });

    } else {
      // Todos los datos de la coleccion
      await Team.find((err, teams) => {
        if (err) {
          return res.status(500).json({ success: false, msg: err });
        }

        res.status(200).json({ success: true, teams: teams });
      });
    }
  },

  /* ================
    Get a Team by Id
  ================ */
  getTeamById: async (req, res, next) => {

    // Validar si hay errores en el Id q se pasa por parametro
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.mapped() });
    }

    // Parametros
    const id = await req.params.id;

    // Buscar team
    await Team.findById(id, (err, team) => {
      if (err) {
        return res.status(500).json({ success: false, msg: err });
      }

      if (!team) {
        return res.status(404).json({ success: false, msg: 'No se ha encontrado Equipo con ese ID' });
      }

      res.status(200).json({ success: true, team: team });
    });
  },

  /* =================
    Create a New Team
  ================= */
  createTeam: async (req, res, next) => {

    // Validar si hay errores en los datos del body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.mapped() });
    }

    // Datos del body
    const { name, imageUrl } = await req.body;

    // Validar que el team no exista
    const sameNameTeam = await Team.findOne({ name: name });
    if (sameNameTeam) {
      return res.status(403).json({ success: false, msg: 'El Equipo ya existe' });
    }

    // Crear nuevo Team con los datos del body
    const newTeam = new Team({
      name: name,
      imageUrl: imageUrl
    });

    // Persistencia del nuevo Team
    await newTeam.save();

    // Success response (si todo va bien)
    res.status(201).json({ success: true, msg: 'Equipo creado', team: newTeam });
  },

  /* ==============
    Update a Team
  ============== */
  editTeam: async (req, res, next) => {

    // Validar si hay errores en los datos del body y param
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.mapped() });
    }

    // Parametros
    const id = await req.params.id;

    // Datos del body
    const updatedName = await req.body.name;

    // Validar que el team no exista
    const sameNameTeam = await Team.findOne({ name: updatedName });
    if (sameNameTeam) {
      return res.status(403).json({ success: false, msg: 'El Equipo ya existe' });
    }

    // Crear nuevo Team con los datos del body
    const updatedTeam = new Team({
      name: updatedName,
      _id: id
    });

    // Encontrar y actualizar
    await Team.findByIdAndUpdate(id, updatedTeam, { new: true }, (err, team) => {
      if (err) {
        return res.status(500).json({ success: false, msg: err });

      }
      if (!team) {
        return res.status(404).json({ success: false, msg: 'No se ha encontrado Equipo con ese ID' });
      }

      res.status(200).json({ success: true, msg: 'Equipo actualizado', team: team });
    });
  },

  /* ==============
    Delete a Team
  ============== */
  deleteTeam: async (req, res, next) => {

    // Validar si hay errores en el Id q se pasa por parametro
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.mapped() });
    }

    // Parametros
    const id = await req.params.id;

    // Encontrar y eliminar
    await Team.findByIdAndRemove(id, (err, team) => {
      if (err) {
        return res.status(500).json({ success: false, msg: err });
      }

      if (!team) {
        return res.status(404).json({ success: false, msg: 'No se ha encontrado Equipo con ese ID' });
      }

      res.status(200).json({ success: true, msg: 'Equipo eliminado', team: team });
    });
  },

}