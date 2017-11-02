const router = require('express').Router();

// Teams
router.use('/teams', require('./teams.routes'));

module.exports = router;