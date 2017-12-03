const express = require('express');
const router = express.Router();
const { check, param, query } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

const GamesController = require('../controllers/games.controller');

// Todos los partidos con queries
router.get('/', [
    query('c').isIn(['', 'inProgress', 'pending', 'finished']).withMessage('No es un query válido')
], GamesController.getAllGames);

// Partidos por Id
router.get('/:id', [
    param('id').isMongoId().withMessage('No es un ID de Partido válido')
], GamesController.getGameById);

// Crea el juego, solo los equipos, el partido no inicio aun
router.post('/', [
    sanitize('localTeamName').trim(),
    check('localTeamName').not().isEmpty().withMessage('El campo Equipo Local es requerido'),
    check('localTeamName').isLength({ min: 3, max: 50 }).withMessage('El campo Equipo Local debe tener de 3 a 50 caracteres'),
    sanitize('visitingTeamName').trim(),
    check('visitingTeamName').not().isEmpty().withMessage('El campo Equipo Visitante es requerido'),
    check('visitingTeamName').isLength({ min: 3, max: 50 }).withMessage('El campo Equipo Visitante debe tener de 3 a 50 caracteres')
], GamesController.createGame);

// Inicia el partido
router.post('/:id/start', [
    param('id').isMongoId().withMessage('No es un ID de Partido válido')
], GamesController.startGame);

// Finaliza el partido
router.post('/:id/finish', [
    param('id').isMongoId().withMessage('No es un ID de Partido válido')
], GamesController.finishGame);

// Eliminar un partido
router.delete('/:id', [
    param('id').isMongoId().withMessage('No es un ID de Partido válido')
], GamesController.deleteGame);

// Agrega un evento
router.post('/:id/events', [
    param('id').isMongoId().withMessage('No es un ID de Partido válido'),
    sanitize('type').trim(),
    check('type').not().isEmpty().withMessage('El campo Tipo es requerido'),
    check('type').isIn(['Gol', 'Amonestación', 'Expulsión', 'Sustitución']).withMessage('No es un Tipo de Evento válido'),
    sanitize('team').trim(),
    check('team').not().isEmpty().withMessage('El campo Equipo es requerido'),
    check('team').isIn(['local', 'visiting']).withMessage('El campo Equipo debe ser "local" o "visiting"'),
    sanitize('player1').trim(),
    sanitize('player2').trim(),
    sanitize('isOwnGoal').trim(),
    check('isOwnGoal').optional().isBoolean().withMessage('El campo isOwnGoal debe ser booleano')
], GamesController.createEvent);

// Eventos del partido
router.get('/:id/events', [
    param('id').isMongoId().withMessage('No es un ID de Partido válido')
], GamesController.getEventsByGame);

// Eliminar evento de un partido con su id
router.delete('/:id/events/:idEvent', [
    param('id').isMongoId().withMessage('No es un ID de Partido válido'),
    param('idEvent').isMongoId().withMessage('No es un ID de Evento válido')
], GamesController.deleteEvent);

module.exports = router;