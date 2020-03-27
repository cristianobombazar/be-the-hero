import {Router} from "express";
import rootController from './controller/root.controller';
import ngoController from './controller/ngo-controller-impl';
import incidentController from './controller/incident-controller-impl';
import sessionController from './controller/session-controller-impl';
import profileController from './controller/profile-controller-impl';

const routes = Router();

rootController.useRouter(routes);
ngoController.useRouter(routes);
incidentController.useRouter(routes);
sessionController.useRouter(routes);
profileController.useRouter(routes);

export default routes;