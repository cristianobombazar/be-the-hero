import {Controller} from './interfaces/controller'
import {PostRoutes} from './interfaces/post-routes';
import {Request, Response, Router} from "express";
import service from '../service/session-service';
import {ResponseWrapper} from '../wrapper/response-wrapper';
import sessionControllerValidation from './validations/session-controller-validation';

class SessionController implements Controller, PostRoutes {

  useRouter(router: Router): void {
    this.addPostRoutes(router);
  }

  addPostRoutes(router: Router): void {
    this.authenticate(router);
  }

  authenticate(router: Router): void {
    router.post("/session", sessionControllerValidation.authenticateValidate(), async (request: Request, response: Response): Promise<any> => {
      const { id } = request.body;
      try {
        return response.json(await service.handleSession(id));
      }catch(error) {        
        return ResponseWrapper.wrapError(error, response);
      }
    });
  }

}

export default new SessionController();