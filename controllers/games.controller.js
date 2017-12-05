const { check, validationResult } = require('express-validator/check');

const mongoose = require('mongoose');

const Game = require('../models/game.model');
const Event = require('../models/event.model');

module.exports = {
  /* ==============
   Get All Games
  ============== */
  getAllGames: async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.mapped() });
    }

    const condition = await req.query.c;

    if (!condition) {
      // Todos los partidos
      await Game.find((err, games) => {
        if (err) {
          return res.status(500).json({ success: false, msg: err });
        }

        res.status(200).json({ success: true, games: games });
      });
    }

    if (condition === 'inProgress') {
      // Partidos iniciados, no finalizados
      await Game.find({ 'start.isStarted': true, 'finish.isFinished': false }, (err, games) => {
        if (err) {
          return res.status(500).json({ success: false, msg: err });
        }

        res.status(200).json({ success: true, games: games });
      });
    }

    if (condition === 'pending') {
      // Partidos creados pero que no iniciaron
      await Game.find({ 'start.isStarted': false }, (err, games) => {
        if (err) {
          return res.status(500).json({ success: false, msg: err });
        }

        res.status(200).json({ success: true, games: games });
      });
    }

    if (condition === 'finished') {
      //Partidos Finalizados
      await Game.find({ 'finish.isFinished': true }, (err, games) => {
        if (err) {
          return res.status(500).json({ success: false, msg: err });
        }

        res.status(200).json({ success: true, games: games });
      });
    }

  },

  /* ===============
   Get a Game by Id
  =============== */
  getGameById: async (req, res, next) => {

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

      res.status(200).json({ success: true, game: game });
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

  /* ========
  Add Event
 ========= */
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

    await Game.findById(id, (err, game) => {
      if (err) {
        return res.status(500).json({ success: false, msg: err });
      }

      if (!game) {
        return res.status(404).json({ success: false, msg: 'No se ha encontrado Partido con ese ID' });
      }

      if (!game.start.isStarted) {
        console.log('no iniciado');
        return res.status(400).json({ success: false, msg: 'El Partido no se ha iniciado' });
      }

      if (game.finish.isFinished) {
        console.log('finalizado');
        return res.status(400).json({ success: false, msg: 'El Partido se ha finalizado' });
      }

      // Crear un evento con los datos del body
      let newEvent = new Event({
        type: type,
        player1: player1,
        player2: player2
      });

      if (type === 'Gol') {
        if (!player1) {
          return res.status(403).json({ success: false, msg: 'El campo player1 es requerido para un gol' });
        }
        if (player2) {
          return res.status(403).json({ success: false, msg: 'El campo player2 está prohibido para un gol' });
        }
        if (isOwnGoal !== undefined && isOwnGoal !== '') { //ya está validado que es booleano
          newEvent.isOwnGoal = JSON.parse(isOwnGoal);
        }
        else {
          return res.status(403).json({ success: false, msg: 'El campo isOwnGoal es requerido para un gol' });
        }
      }
      else if (type === 'Sustitución') {
        if (!player1 || !player2) {
          return res.status(403).json({ success: false, msg: 'Los campos player1 y player2 son requeridos para un cambio' });
        }
      }

      newEvent.save((err, event) => {
        if (err) {
          return res.status(500).json({ success: false, msg: err });
        }

        const teamObj = (team === 'local') ? game.localTeam : game.visitingTeam;
        if (type === 'Gol') {
          teamObj.goals++;
        }

        // Cambio al modelo, los eventos son de cada equipo por separado y no del game
        teamObj.events.push(event._id);

        game.save((err, game) => {
          if (err) {
            return res.status(500).json({ success: false, msg: err });
          }

          res.status(200).json({ success: true, msg: 'Evento agregado', event: event });
        });
      });
    });

  },

  /* ============
  Events by Game
 ============= */
  getEventsByGame: async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.mapped() });
    }

    const id = await req.params.id;

    await Game
      .findById(id)
      .populate('localTeam.events')
      .populate('visitingTeam.events')
      .exec(function (err, game) {
        if (err) {
          return res.status(500).json({ success: false, msg: err });
        }

        if (!game) {
          return res.status(404).json({ success: false, msg: 'No se ha encontrado Partido con ese ID' });
        }

        const localEvents = game.localTeam.events;
        const visitingEvents = game.visitingTeam.events;

        return res.status(200).json({
          success: true,
          localEvents: localEvents,
          visitingEvents: visitingEvents
        });
      });

  },

   /* ===========
  Delete event by id
 ============ */
 deleteEvent: async (req, res, next) => {
    // Validar si hay errores en el Id que se pasa por parametro
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.mapped() });
    }

    //Parametros
    const id = await req.params.id;
    const idEvent = await req.params.idEvent;

    //Elimina del array de eventos del game y despues de la coleccion de eventos
    await Game.findById(id,(err, game) => {
      if (err) {
        return res.status(500).json({ success: false, msg: err });  
      }
      if (!game) {
        return res.status(404).json({ success: false, msg: 'No se ha encontrado Partido con ese ID' });
      }
      const localEventId = game.localTeam.events.find((id) => id.equals(idEvent));
      const visitingEventId = game.visitingTeam.events.find((id) => id.equals(idEvent));
      if (localEventId || visitingEventId) {
        game.localTeam.events.pull(idEvent);
        game.visitingTeam.events.pull(idEvent);
        game.save((err, game) => {
          if (err) {
            return res.status(500).json({ success: false, msg: err });
          }

          //res.status(200).json({ success: true, msg: 'Evento eliminado', game: game });
        });

        //Elimina de la colección de eventos
        Event.findByIdAndRemove(idEvent, (err, event) => {
          if (err) {
            return res.status(500).json({ success: false, msg: err });
          }
          if (!event) {
            return res.status(404).json({ success: false, msg: 'No se ha encontrado un evento con ese ID' });
          }

          res.status(200).json({ success: true, msg: 'Evento eliminado', event: event });
        });
      }
      else {
        res.status(404).json({ success: false, msg: 'No se ha encontrado un evento con ese ID en el Partido' });
      }
    });

  }

}