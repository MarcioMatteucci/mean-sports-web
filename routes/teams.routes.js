const express = require('express');
const router = express.Router();
const { check } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

const TeamsController = require('../controllers/teams.controller');

router.get('/', TeamsController.getAllTeams);

router.get('/:id', TeamsController.getTeamById);

router.post('/', [
   check('name').isLength({ min: 1 }).withMessage('El campo Nombre es requerido'),
   check('name').isLength({ min: 3, max: 50 }).withMessage('El campo Nombre debe tener de 3 a 50 caracteres'),
   sanitize('name').trim()
], TeamsController.createTeam);

router.put('/:id', [
   check('name').isLength({ min: 1 }).withMessage('El campo Nombre es requerido'),
   check('name').isLength({ min: 3, max: 50 }).withMessage('El campo Nombre debe tener de 3 a 50 caracteres'),
   sanitize('name').trim()
], TeamsController.editTeam);

router.delete('/:id', TeamsController.deleteTeam);

module.exports = router;