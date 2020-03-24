const express = require('express');
const ongController = require('./controllers/NgoController');
const incidentController = require('./controllers/IncidentController');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/session', sessionController.create);
routes.get('/ngo', ongController.findAll);
routes.post('/ngo', ongController.create);
routes.post('/incident', incidentController.create);
routes.get('/incident', incidentController.findAll);
routes.delete('/incident/:id', incidentController.deleteById);
routes.get('/profile', profileController.findAllByNgo);

module.exports = routes;