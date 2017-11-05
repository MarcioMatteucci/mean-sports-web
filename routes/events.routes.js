const express = require('express');
const router = express.Router();
const { check } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

const EventsController = require('../controllers/events.controller');

router.get('/', EventsController.getAllEvents);

router.get('/:id', EventsController.getEventById);

router.post('/', [
   check('type').isLength({ min: 1 }).withMessage('El campo Nombre es requerido'),
   check('type').isLength({ min: 2, max: 50 }).withMessage('El campo Nombre debe tener de 2 a 50 caracteres'),
   sanitize('type').trim()
], EventsController.createEvent);

router.put('/:id', EventsController.editEvent);

router.delete('/:id', EventsController.deleteEvent);

module.exports = router;