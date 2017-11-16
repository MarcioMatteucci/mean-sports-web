const express = require('express');
const router = express.Router();
const { check, param } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

const GamesController = require('../controllers/games.controller');

router.get('/', GamesController.getAllGames);

router.post('/', [
   sanitize('name').trim(),
   check('name').not().isEmpty().withMessage('El campo Nombre es requerido'),
   check('name').isLength({ min: 3, max: 50 }).withMessage('El campo Nombre debe tener de 3 a 50 caracteres'),
   /*param('teams').isMongoId().withMessage('No es un ID de Team válido')*/ //Falta validacion de que sea un id mongo
], GamesController.createGame);

router.delete('/:id', [
    param('id').isMongoId().withMessage('No es un ID de Partido válido')
 ], GamesController.deleteGame);

module.exports = router;