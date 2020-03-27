import {Controller} from './interfaces/controller';
import {Request, Response, Router} from "express";
import {GetRoutes} from "./interfaces/get-routes";
import {PostRoutes} from "./interfaces/post-routes";
import {DeleteRoutes} from "./interfaces/delete-routes";
import {Incident} from '../model/incident.model'
import service from '../service/incident-service';
import {ResponseWrapper} from '../wrapper/response-wrapper';
import incidentControllerValidation  from './validations/incident-controller-validation'

class IncidentController implements Controller, GetRoutes, PostRoutes, DeleteRoutes {


  useRouter(router: Router): void {
    this.addGetRoutes(router);
    this.addPostRoutes(router);
    this.addDeleteRoutes(router);
  }

  addGetRoutes(router: Router): void {
    router.get('/incident',  async (request: Request, response: Response) => {
      const { page, size } = request.query;
      const [incidents, total] = await service.findAll(page, size)
      
      response.header('X-Total-Count', total);
      return response.json(incidents);
  });
  }

  addPostRoutes(router: Router): void {
    router.post('/incident', incidentControllerValidation.saveValidation(), async (request: Request, response: Response) => {
      const incident = request.body as Incident;
      incident.ngo_id = request.headers.authorization as string;
      try{
        return response.json(await service.save(incident));
      }catch(error) {        
        return ResponseWrapper.wrapError(error, response);
      }
    });
  }

  addDeleteRoutes(router: Router): void {
    router.delete('/incident/:id', incidentControllerValidation.deleteValidation(), async (request: Request, response: Response) => {
      const ngo_id = request.headers.authorization as string;
      const { id } = request.params;
      try {
        await service.deleteIncident(Number(id), ngo_id);
        return response.status(204).send();
      }catch(error) {
        return ResponseWrapper.wrapError(error, response);
      }      
    });
  }

}

export default new IncidentController();