const router = require('express').Router();

// Teams
router.use('/teams', require('./teams.routes'));

// Events
router.use('/events', require('./events.routes'));

// Games
router.use('/games', require('./games.routes'));

module.exports = router;