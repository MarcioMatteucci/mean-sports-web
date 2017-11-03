const router = require('express').Router();

// Teams
router.use('/teams', require('./teams.routes'));

// Events
router.use('/events', require('./events.routes'));

module.exports = router;