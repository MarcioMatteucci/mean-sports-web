const express = require('express');
const router = express.Router();
const { check, param } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

const TeamsController = require('../controllers/teams.controller');

router.get('/', TeamsController.getAllTeams);

router.get('/:id', [
   param('id').isMongoId().withMessage('No es un ID de Equipo válido')
], TeamsController.getTeamById);

router.post('/', [
   sanitize('name').trim(),
   check('name').not().isEmpty().withMessage('El campo Nombre es requerido'),
   check('name').isLength({ min: 3, max: 50 }).withMessage('El campo Nombre debe tener de 3 a 50 caracteres')
], TeamsController.createTeam);

router.put('/:id', [
   param('id').isMongoId().withMessage('No es un ID de Equipo válido'),
   sanitize('name').trim(),
   check('name').not().isEmpty().withMessage('El campo Nombre es requerido'),
   check('name').isLength({ min: 3, max: 50 }).withMessage('El campo Nombre debe tener de 3 a 50 caracteres')
], TeamsController.editTeam);

router.delete('/:id', [
   param('id').isMongoId().withMessage('No es un ID de Equipo válido')
], TeamsController.deleteTeam);

module.exports = router;