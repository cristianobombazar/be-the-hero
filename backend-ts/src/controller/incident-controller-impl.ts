import {Controller} from './interfaces/generic/controller';
import {IncidentController} from './interfaces/incident-controller';
import {Request, Response, Router} from "express";
import {GetRoutes} from "./interfaces/generic/get-routes";
import {PostRoutes} from "./interfaces/generic/post-routes";
import {DeleteRoutes} from "./interfaces/generic/delete-routes";
import {Incident} from '../model/incident.model'
import service from '../service/incident-service';
import {ResponseWrapper} from '../wrapper/response-wrapper';
import validation  from './validations/incident-controller-validation'

class IncidentControllerImpl implements IncidentController, Controller, GetRoutes, PostRoutes, DeleteRoutes {


  public router: Router;

  useRouter(router: Router): void {
    this.router = router;
    this.addGetRoutes();
    this.addPostRoutes();
    this.addDeleteRoutes();
  }

  addGetRoutes(): void {
    this.findAll();
  }

  addPostRoutes(): void {
    this.save();
  }

  addDeleteRoutes(): void {
    this.deleteById();
  }

  findAll() {
    this.router.get('/incident', async (request: Request, response: Response) => {
      const { page, size } = request.query;
      const [incidents, total] = await service.findAll(page, size)
      
      response.header('X-Total-Count', total);
      return response.json(incidents);
    });
  }

  save() {
    this.router.post('/incident', validation.save(), async (request: Request, response: Response) => {
      const incident = request.body as Incident;
      incident.ngo_id = request.headers.authorization as string;
      try{
        return response.json(await service.save(incident));
      }catch(error) {        
        return ResponseWrapper.wrapError(error, response);
      }
    });
  }

  deleteById() {
    this.router.delete('/incident/:id', validation.deleteById(), async (request: Request, response: Response) => {
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

export default new IncidentControllerImpl();