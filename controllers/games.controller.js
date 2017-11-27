const { check, validationResult } = require('express-validator/check');

const Game = require('../models/game.model');
const Event = require('../models/event.model');

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
  },

  getAllEvents: async (req, res, next) => {

    // Validar si hay errores en el Id q se pasa por parametro
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

      res.status(200).json({ success: true, localTeamEvents: game.localTeam.events, visitingTeamEvents: game.visitingTeam.events });
    })
  },

  createEvent: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.mapped() });
    }

    // Parametros
    const id = await req.params.id;

    // Campos del body
    const type = await req.body.type;
    const team = await req.body.team;
    const player1 = await req.body.player1;
    const player2 = await req.body.player2;
    const isOwnGoal = await req.body.isOwnGoal;

    // Validar que exista el tipo de evento
    const eventType = await Event.findOne({ type: type });
    if (!eventType) {
      return res.status(403).json({ success: false, msg: 'El tipo de evento no existe' });
    }

    // Crear un evento con los datos del body
    let event = { typeEvent: type, player1: player1, player2: player2, eventAt: Date.now() };
    let goalIncrement = 0;
    if (type === 'goal') {
      goalIncrement = 1;
      if (isOwnGoal === 'true' || isOwnGoal === 'false') {
        event.isOwnGoal = JSON.parse(isOwnGoal);
      }
      else {
        event.isOwnGoal = false; //fallback
      }
    }

    // Encontrar y actualizar, incrementando los goles si es necesario
    // e insertando el evento
    if (team === 'local') {
      await Game.findByIdAndUpdate(id,
        {
          $inc : {
            "localTeam.goals" : goalIncrement
          },

          $push: {
            "localTeam.events" : event
          }
        }, { new: true }, (err, game) => {
          if (err) {
            return res.status(500).json({ success: false, msg: err });
          }
          if (!game) {
            return res.status(404).json({ success: false, msg: 'No se ha encontrado Partido con ese ID' });
          }

          const newEvent = game.localTeam.events[game.localTeam.events.length - 1];
          res.status(200).json({ success: true, msg: 'Evento de equipo local agregado', event: newEvent });
        });
    }
    else {
      await Game.findByIdAndUpdate(id,
        {
          $inc : {
            "visitingTeam.goals" : goalIncrement
          },

          $push: {
            "visitingTeam.events" : event
          }
        }, { new: true }, (err, game) => {
          if (err) {
            return res.status(500).json({ success: false, msg: err });
          }
          if (!game) {
            return res.status(404).json({ success: false, msg: 'No se ha encontrado Partido con ese ID' });
          }

          const newEvent = game.visitingTeam.events[game.visitingTeam.events.length - 1];
          res.status(200).json({ success: true, msg: 'Evento de equipo visitante agregado', event: newEvent });
        });
    }
  }
}