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

    const localTeamName = await req.body.localTeamName;
    const visitingTeamName = await req.body.visitingTeamName;

    const newGame = new Game({
      localTeam: {
        name: localTeamName
      },
      visitingTeam: {
        name: visitingTeamName
      }
    });

    await newGame.save();

    res.status(201).json({ success: true, msg: 'Partido creado', game: newGame });
  },

  /* =============
   Start a Game
  ============= */
  startGame: async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.mapped() });
    }

    const id = await req.params.id;

    await Game.findByIdAndUpdate(id,
      {
        $set: {
          start: {
            startedAt: Date.now(),
            isStarted: true
          }
        }
      }, { new: true }, (err, game) => {
        if (err) {
          return res.status(500).json({ success: false, msg: err });

        }
        if (!game) {
          return res.status(404).json({ success: false, msg: 'No se ha encontrado Partido con ese ID' });
        }

        res.status(200).json({ success: true, msg: 'Partido iniciado', game: game });
      });
  },

  /* =============
   Finish a Game
  ============= */
  finishGame: async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.mapped() });
    }

    const id = await req.params.id;

    await Game.findById(id, (err, game) => {
      if (err) {
        return res.status(500).json({ success: false, msg: err });
      }

      if (!game) {
        return res.status(404).json({ success: false, msg: 'No se ha encontrado Partido con ese ID' });
      }

      if (!game.start.isStarted) {
        console.log('no iniciado')
        return res.status(400).json({ success: false, msg: 'El Partido no se ha iniciado' });
      }

      game.finish.isFinished = true;
      game.finish.finishedAt = Date.now();

      game.save((err, game) => {
        if (err) {
          return res.status(500).json({ success: false, msg: err });
        }

        res.status(200).json({ success: true, msg: 'Partido finalizado', game: game });
      });
    });
  },

  /* ===========
  Delete game
 ============ */
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