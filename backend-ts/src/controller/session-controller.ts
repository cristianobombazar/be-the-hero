import {Controller} from './interfaces/controller'
import {PostRoutes} from './interfaces/post-routes';
import {Request, Response, Router} from "express";
import service from '../service/session-service';
import {ResponseWrapper} from '../wrapper/response-wrapper';

class SessionController implements Controller, PostRoutes {

  useRouter(router: Router): void {
    this.addPostRoutes(router);
  }

  addPostRoutes(router: Router): void {
    router.post("/session", async (request: Request, response: Response): Promise<any> => {
      const { id } = request.body;
      try {
        return response.json(await service.handleSession(id));
      }catch(error) {        
        return ResponseWrapper.wrap(error, response);
      }
    });
  }

}

export default new SessionController();