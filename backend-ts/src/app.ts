import express, {Application } from 'express';
import routes from './routes';
import { errors } from 'celebrate';

class App {

    public app : Application;

    constructor() {
        this.app = express();
        this.addJsonSupport();
        this.addRoutes();
        this.initializePort();
        this.addValidationHandler();
    }

    private addJsonSupport(): void {
        this.app.use(express.json());
    };

    private addRoutes() {
        this.app.use(routes);
    }

    private initializePort() {
        this.app.listen(3333, () => {
            console.log("Server started on port 3333")
        });
    }

    private addValidationHandler() {
        this.app.use(errors());
    }
}

export default new App();