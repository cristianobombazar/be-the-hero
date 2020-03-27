import {Controller} from "./interfaces/generic/controller";
import {NgoController} from './interfaces/ngo-controller';
import {Request, Response, Router} from "express";
import {GetRoutes} from "./interfaces/generic/get-routes";
import {PostRoutes} from "./interfaces/generic/post-routes";
import service from '../service/ngo-service';
import {Ngo} from "../model/ngo.model";
import {ResponseWrapper} from '../wrapper/response-wrapper';
import validation from './validations/ngo-controller-validation';


class NgoControllerImpl implements NgoController, Controller, GetRoutes, PostRoutes {
    
    public router: Router;

    useRouter(router: Router): void {
        this.router = router;
        this.addGetRoutes();
        this.addPostRoutes();
    }

    addGetRoutes(): void {
        this.findAll();
    }

    addPostRoutes(): void {
       this.save();
    }

    findAll(): void {
        this.router.get('/ngo', async (request: Request, response: Response) => {
            return response.json(await service.findAll());
        });
    }

    save(): void {
        this.router.post('/ngo', validation.save(), async (request: Request, response: Response) => {
            const ngo = request.body as Ngo;
            try{
                return response.json(await service.save(ngo));
            }catch(error) {
                return ResponseWrapper.wrapError(error, response);
            }
        });
    }
}

export default new NgoControllerImpl();