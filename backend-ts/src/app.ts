import express, {Application } from 'express';
import routes from './routes';
import { errors } from 'celebrate';

class App {

    public app : Application;

    constructor() {
        this.app = express();
        this.addJsonSupport();
        this.addRoutes();
        this.addValidationHandler();
    }

    private addJsonSupport(): void {
        this.app.use(express.json());
    };

    private addRoutes() {
        this.app.use(routes);
    }
    
    private addValidationHandler() {
        this.app.use(errors());
    }
}

export default new App().app;