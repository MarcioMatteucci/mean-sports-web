const express = require('express');
const router = express.Router();
const { check, param } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

const EventsController = require('../controllers/events.controller');

router.get('/', EventsController.getAllEvents);

router.get('/:id', [
   param('id').isMongoId().withMessage('No es un ID de Evento válido'),
], EventsController.getEventById);

router.post('/', [
   sanitize('type').trim(),
   check('type').not().isEmpty().withMessage('El campo Evento es requerido'),
   check('type').isLength({ min: 2, max: 50 }).withMessage('El campo Evento debe tener de 2 a 50 caracteres')
], EventsController.createEvent);

router.put('/:id', [
   param('id').isMongoId().withMessage('No es un ID de Evento válido'),
   sanitize('type').trim(),
   check('type').not().isEmpty().withMessage('El campo Evento es requerido'),
   check('type').isLength({ min: 2, max: 50 }).withMessage('El campo Evento debe tener de 2 a 50 caracteres')
], EventsController.editEvent);

router.delete('/:id', [
   param('id').isMongoId().withMessage('No es un ID de Evento válido'),
], EventsController.deleteEvent);

module.exports = router;