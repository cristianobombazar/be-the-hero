import express, {Application } from 'express';
import routes from './routes';

class App {

    public app : Application;

    constructor() {
        this.app = express();
        this.addJsonSupport();
        this.addRoutes();
        this.initializePort();
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
}

export default new App();