const express = require('express');
const router = require('express-promise-router')();

const TeamsController = require('../controllers/teams.controller');

router.route('/')
   .get(TeamsController.getAllTeams);

router.route('/:id')
   .get(TeamsController.getTeamById);

router.route('/')
   .post(TeamsController.createTeam);

// router.route('/')
//    .put(TeamsController.editTeam);

// router.route('/')
//    .delete(TeamsController.deleteTeam);


module.exports = router;