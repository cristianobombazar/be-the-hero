import {Controller} from './interfaces/controller';
import {Request, Response, Router} from "express";
import {GetRoutes} from "./interfaces/get-routes";
import {PostRoutes} from "./interfaces/post-routes";
import {DeleteRoutes} from "./interfaces/delete-routes";
import {Incident} from '../model/incident.model'
import service from '../service/incident-service';
import {ResponseWrapper} from '../wrapper/response-wrapper';

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
    router.post('/incident',  async (request: Request, response: Response) => {
      const ngo_id = request.headers.authorization;
      if (!ngo_id) {
        return ResponseWrapper.wrap('ngo_id must to be provided', response);
      }
      const incident = request.body as Incident;
      incident.ngo_id = ngo_id;

      try{
        return response.json(await service.save(incident));
      }catch(error) {        
        return ResponseWrapper.wrap(error, response);
      }
    });
  }

  addDeleteRoutes(router: Router): void {
    router.delete('/incident/:id',  async (request: Request, response: Response) => {
      const ngo_id = request.headers.authorization;
      if (!ngo_id) {
        return ResponseWrapper.wrap('ngo_id must to be provided', response);
      }
      const { id } = request.params;
      try {
        await service.deleteIncident(Number(id), ngo_id);
        return response.status(204).send();
      }catch(error) {
        return ResponseWrapper.wrap(error, response);
      }      
    });
  }

}

export default new IncidentController();