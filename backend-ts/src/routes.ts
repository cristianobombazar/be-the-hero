import {Router, } from "express";
import rootController from './controller/root.controller';
import ngoController from './controller/ngo-controller';

const routes = Router();

rootController.useRouter(routes);
ngoController.useRouter(routes);

export default routes;