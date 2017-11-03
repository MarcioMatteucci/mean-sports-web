const express = require('express');
const router = express.Router();

const EventsController = require('../controllers/events.controller');

router.route('/')
   .get(EventsController.getAllEvents);

router.route('/:id')
   .get(EventsController.getEventById);

router.route('/')
   .post(EventsController.createEvent);

router.route('/:id')
   .put(EventsController.editEvent);

router.route('/:id')
   .delete(EventsController.deleteEvent);

module.exports = router;