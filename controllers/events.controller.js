const Event = require('../models/event.model');
const validator = require('../helpers/validations');

module.exports = {
   /* ==============
    Get All Events
   ============== */
   getAllEvents: async (req, res, next) => {
      await Event.find((err, events) => {
         if (err) {
            return res.status(500).json({ success: false, msg: err });
         }

         res.status(200).json({ success: true, events: events });
      });
   },

   /* ================
    Get a Event by Id
   ================ */
   getEventById: async (req, res, next) => {
      const id = await req.params.id;

      await Event.findById(id, (err, event) => {
         if (err) {
            return res.status(500).json({ success: false, msg: err });
         }

         if (!event) {
            return res.status(404).json({ success: false, msg: 'No se ha encontrado Evento con ese ID' });
         }

         res.status(200).json({ success: true, event: event });
      });
   },

   /* =================
    Create a New Event
   ================= */
   createEvent: async (req, res, next) => {
      const type = await req.body.type;

      if (validator.isEmpty(type)) {
         return res.status(400).json({ success: false, msg: 'El campo Tipo de Evento es requerido' });
      }

      const sameTypeEvent = await Event.findOne({ type: type });
      if (sameTypeEvent) {
         return res.status(403).json({ success: false, msg: 'El Tipo de Evento ya existe' });
      }

      const newEvent = new Event({
         type: type
      });

      await newEvent.save();

      res.status(201).json({ success: true, msg: 'Evento creado', event: newEvent });
   },

   /* ==============
    Update a Event
   ============== */
   editEvent: async (req, res, next) => {
      const id = await req.params.id;

      const updatedType = await req.body.type;

      if (validator.isEmpty(updatedType)) {
         return res.status(400).json({ success: false, msg: 'El campo Tipo de Evento es requerido' });
      }

      const sameTypeEvent = await Event.findOne({ type: updatedType });
      if (sameTypeEvent) {
         return res.status(403).json({ success: false, msg: 'El Tipo de Evento ya existe' });
      }

      const updatedEvent = new Event({
         type: updatedType,
         _id: id
      });

      await Event.findByIdAndUpdate(id, updatedEvent, { new: true }, (err, event) => {
         if (err) {
            return res.status(500).json({ success: false, msg: err });
         }

         if (!event) {
            return res.status(404).json({ success: false, msg: 'No se ha encontrado Evento con ese ID' });
         }

         res.status(200).json({ success: true, msg: 'Evento actualizado', event: event });
      });
   },

   /* ==============
    Delete a Team
   ============== */
   deleteEvent: async (req, res, next) => {
      const id = await req.params.id;

      await Event.findByIdAndRemove(id, (err, event) => {
         if (err) {
            return res.status(500).json({ success: false, msg: err });
         }

         if (!event) {
            return res.status(404).json({ success: false, msg: 'No se ha encontrado Evento con ese ID' });
         }

         res.status(200).json({ success: true, msg: 'Evento eliminado', event: event });
      });
   }

}