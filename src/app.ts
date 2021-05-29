import * as express from 'express';
import {
    notFound,
} from './helpers/errorHandler';
import { registerRoutes } from './routes';

export class App {
    // ref to express instance
    public app: express.Application;

    // run configuration method to express instance
    constructor() {
        this.app = express();
        this.config();
    }

    // configure middleware
    private config(): void {
        this.app.use(express.json({ limit: '1mb' }));
        this.app.use(express.urlencoded({ extended: false, limit: '1mb' }));

        // log request
        this.app.use(
            (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                console.info('request method = %s, url = ', req.method, req.url);
                next();
            },
        );

        /**
         * This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints
         */
        registerRoutes(this.app);

        // catch 404
        this.app.use(notFound);
    }
}
