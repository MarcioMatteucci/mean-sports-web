const express = require('express');
const router = express.Router();

const TeamsController = require('../controllers/teams.controller');

router.route('/')
   .get(TeamsController.getAllTeams);

router.route('/:id')
   .get(TeamsController.getTeamById);

router.route('/')
   .post(TeamsController.createTeam);

router.route('/:id')
   .put(TeamsController.editTeam);

router.route('/:id')
   .delete(TeamsController.deleteTeam);

module.exports = router;