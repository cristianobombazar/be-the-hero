import {Controller} from "./interfaces/generic/controller";
import {ProfileController} from "./interfaces/profile-controller";
import {Request, Response, Router} from "express";
import {GetRoutes} from "./interfaces/generic/get-routes";
import service from '../service/profile-service';
import {ResponseWrapper} from '../wrapper/response-wrapper';
import validation from './validations/profile-controller-validation';

class ProfileControllerImpl implements ProfileController, Controller, GetRoutes {


  public router: Router;

  useRouter(router: Router): void {
    this.router = router;
    this.addGetRoutes();
  }

  addGetRoutes(): void {
    this.findAll();
  }

  findAll(): void {
    this.router.get("/profile", validation.findAll(), async (request: Request, response: Response): Promise<any> => {
      const ngo_id = request.headers.authorization as string;
      try {
        return response.json(await service.findAllByNgo(ngo_id));
      }catch(error) {
        return ResponseWrapper.wrapError(error, response);
      }
    });
  }
}

export default new ProfileControllerImpl();