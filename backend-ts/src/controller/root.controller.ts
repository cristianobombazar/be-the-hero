import {Controller} from "./interfaces/controller";
import {Request, Response, Router} from "express";


export class RootController implements Controller{

    useRouter(router: Router): void {
        this.addGetRoutes(router);
    }

    private addGetRoutes(router: Router): void {
        router.get("/", (request: Request, response: Response): any => {
            return response.json({
                "version": "0.0.0.1",
                'developer': 'Cristiano Bombazar',
                'project': 'Be the hero (Omnistack)'
            });
        });
    }
}

export default new RootController();