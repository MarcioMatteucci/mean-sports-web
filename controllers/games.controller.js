const { check, validationResult } = require('express-validator/check');

const Game = require('../models/game.model');

module.exports = {
   /* ==============
    Get All Games
   ============== */
   getAllGames: async (req, res, next) => {

      await Game.find((err, games) => {
         if (err) {
            return res.status(500).json({ success: false, msg: err });
         }

         res.status(200).json({ success: true, games: games });
      });
   },

   /* =================
    Create a New Game
   ================= */
   createGame: async (req, res, next) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ success: false, errors: errors.mapped() });
      }

      const name = await req.body.name;
      const dateStart = await req.body.dateStart;
      const teams = await req.body.teams;
      const ended = await req.body.ended;

      const sameName = await Game.findOne({ name: name });
      if (sameName) {
         return res.status(403).json({ success: false, msg: 'El partido ya existe' });
      }

      const newGame = new Game({
         name: name, 
         dateStart: dateStart,
         teams: teams,
         ended: ended    
      });

      await newGame.save();

      res.status(201).json({ success: true, msg: 'Partido creado', game: newGame });
   },

    /* =================
    Delete game
   ================= */

   deleteGame: async (req, res, next) => {
    
        // Validar si hay errores en el Id q se pasa por parametro
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ success: false, errors: errors.mapped() });
        }
    
        const id = await req.params.id;
    
        await Game.findByIdAndRemove(id, (err, game) => {
          if (err) {
            return res.status(500).json({ success: false, msg: err });
          }
    
          if (!game) {
            return res.status(404).json({ success: false, msg: 'No se ha encontrado un partido con ese ID' });
          }
    
          res.status(200).json({ success: true, msg: 'Partido eliminado', game: game });
        });
      }
}