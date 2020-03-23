import {Router, } from "express";
import rootController from './controller/root.controller';

const routes = Router();

rootController.useRouter(routes);

export default routes;