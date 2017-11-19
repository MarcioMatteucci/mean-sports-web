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

module.exports = router;