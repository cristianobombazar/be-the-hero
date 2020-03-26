import {Router} from "express";
import rootController from './controller/root.controller';
import ngoController from './controller/ngo-controller';
import incidentController from './controller/incident-controller';
import sessionController from './controller/session-controller';
import profileController from './controller/profile-controller';

const routes = Router();

rootController.useRouter(routes);
ngoController.useRouter(routes);
incidentController.useRouter(routes);
sessionController.useRouter(routes);
profileController.useRouter(routes);

export default routes;