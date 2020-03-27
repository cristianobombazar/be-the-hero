const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate')
const ongController = require('./controllers/NgoController');
const incidentController = require('./controllers/IncidentController');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/session', sessionController.create);

routes.get('/ngo', ongController.findAll);
routes.post('/ngo', celebrate({

  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  })

}), ongController.create);

routes.post('/incident', incidentController.create);
routes.get('/incident', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
}),incidentController.findAll);

routes.delete('/incident/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), incidentController.deleteById);

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), profileController.findAllByNgo);

module.exports = routes;