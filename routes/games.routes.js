const express = require('express');
const router = express.Router();
const { check, param } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

const GamesController = require('../controllers/games.controller');

router.get('/', GamesController.getAllGames);

router.post('/', [
    sanitize('localTeamName').trim(),
    check('localTeamName').not().isEmpty().withMessage('El campo Equipo Local es requerido'),
    check('localTeamName').isLength({ min: 3, max: 50 }).withMessage('El campo Equipo Local debe tener de 3 a 50 caracteres'),
    sanitize('visitingTeamName').trim(),
    check('visitingTeamName').not().isEmpty().withMessage('El campo Equipo Visitante es requerido'),
    check('visitingTeamName').isLength({ min: 3, max: 50 }).withMessage('El campo Equipo Visitante debe tener de 3 a 50 caracteres'),
    /*param('teams').isMongoId().withMessage('No es un ID de Team válido')*/ //Falta validacion de que sea un id mongo
], GamesController.createGame);

router.post('/:id/start', [
    param('id').isMongoId().withMessage('No es un ID de Partido válido')
], GamesController.startGame);

router.post('/:id/finish', [
    param('id').isMongoId().withMessage('No es un ID de Partido válido')
], GamesController.finishGame);

router.delete('/:id', [
    param('id').isMongoId().withMessage('No es un ID de Partido válido')
], GamesController.deleteGame);

/*router.get('/:id/events', [
    param('id').isMongoId().withMessage('No es un ID de Partido válido')
], GamesController.getAllEvents);*/

router.post('/:id/events', [
    param('id').isMongoId().withMessage('No es un ID de Partido válido'),
    sanitize('type').trim(),
    check('type').not().isEmpty().withMessage('El campo Tipo es requerido'),
    sanitize('team').trim(),
    check('team').not().isEmpty().withMessage('El campo Equipo es requerido'),
    check('team').isIn(['local', 'visiting']).withMessage('El campo Equipo debe ser "local" o "visiting"'),
    sanitize('player1').trim(),
    sanitize('player2').trim(),
    sanitize('isOwnGoal').trim(),
    check('isOwnGoal').optional().isBoolean().withMessage('El campo isOwnGoal debe ser booleano')
], GamesController.createEvent);

module.exports = router;