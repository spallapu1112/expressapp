import { Application, Request, Response } from 'express';
import { ParseApi } from './components/parse/controller';
const appStartTime = new Date();
export function registerRoutes(app: Application): void {
    app.get('/', (req: Request, res: Response) => {
        return res.status(200).send('App started since ' + appStartTime);
    });

    new ParseApi().register(app);

}
