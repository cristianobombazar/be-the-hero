import {Controller} from './interfaces/generic/controller'
import {PostRoutes} from './interfaces/generic/post-routes';
import {SessionController} from './interfaces/session-controller';
import {Request, Response, Router} from "express";
import service from '../service/session-service';
import {ResponseWrapper} from '../wrapper/response-wrapper';
import validation from './validations/session-controller-validation';

class SessionControllerImpl implements SessionController, Controller, PostRoutes {

  public router: Router;

  useRouter(as: Router): void {
    this.router = as;
    this.addPostRoutes();
  }

  addPostRoutes(): void {
    this.authenticate();
  }

  authenticate(): void {
    this.router.post("/session", validation.authenticate(), async (request: Request, response: Response): Promise<any> => {
      const { id } = request.body;
      try {
        return response.json(await service.handleSession(id));
      }catch(error) {        
        return ResponseWrapper.wrapError(error, response);
      }
    });
  }

}

export default new SessionControllerImpl();