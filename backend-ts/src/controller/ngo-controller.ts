import {Controller} from "./interfaces/controller";
import {Request, Response, Router} from "express";
import {GetRoutes} from "./interfaces/get-routes";
import {PostRoutes} from "./interfaces/post-routes";
import service from '../service/ngo-service';
import {Ngo} from "../model/ngo.model";


export class NgoController implements Controller, GetRoutes, PostRoutes {

    useRouter(router: Router): void {
        this.addGetRoutes(router);
        this.addPostRoutes(router);
    }

    addGetRoutes(router: Router): void {
        router.get('/ngo',  async (request: Request, response: Response) => {
            return response.json(await service.findAll());
        });
    }

    addPostRoutes(router: Router): void {
        router.post('/ngo',  async (request: Request, response: Response) => {
            const ngo = request.body as Ngo;
            return response.json(await service.save(ngo));
        });
    }

}

export default new NgoController();