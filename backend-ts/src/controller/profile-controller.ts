import {Controller} from "./interfaces/controller";
import {Request, Response, Router} from "express";
import {GetRoutes} from "./interfaces/get-routes";
import service from '../service/profile-service';
import {Incident} from '../model/incident.model';
import {ResponseWrapper} from '../wrapper/response-wrapper';
import profileControllerValidation from './validations/profile-controller-validation';

class ProfileController implements Controller, GetRoutes {

  useRouter(router: Router): void {
    this.addGetRoutes(router);
  }

  addGetRoutes(router: Router): void {
    router.get("/profile", profileControllerValidation.getProfileValidation(), async (request: Request, response: Response): Promise<any> => {
      const ngo_id = request.headers.authorization as string;
      try {
        return response.json(await service.findAllByNgo(ngo_id));
      }catch(error) {
        return ResponseWrapper.wrapError(error, response);
      }
    });
  }
}

export default new ProfileController();