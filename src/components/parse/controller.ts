import { Application, Request, Response } from 'express';
import { BaseApi } from '../BaseAPI';

export class ParseApi extends BaseApi {
    constructor() {
      super();
      this.init();
    }

    /**
     * register
     */
    public register(express: Application) {
      express.use('/api', this.router);
    }

    public async parseVersion1(req: Request, res: Response): Promise<void> {
        const str = req.body.data;
        if (!str) {
            return res.status(200).send({ statusCode: 400, msg: 'Invalid request'});
        }
        const data = {
            firstName: str.slice(0, 8),
            lastName: str.slice(8, 18),
            clientId: str.slice(18, 25),
        };
        res.status(200).send({ statusCode: 200, data});
    }

    public async parseVersion2(req: Request, res: Response): Promise<void> {
        const str = req.body.data;
        if (!str) {
            return res.status(200).send({ statusCode: 400, msg: 'Invalid request'});
        }
        const result = str.split(0).filter((item) => item.trim() !== '');
        const data = {
            firstName: result[0],
            lastName: result[1],
            clientId: [result[2].slice(0, 3), '-', result[2].slice(3)].join(''),
        };
        res.status(200).send({ statusCode: 200, data});
    }
    private init(): void {
        this.router.post('/v1/parse', this.parseVersion1);
        this.router.post('/v2/parse', this.parseVersion2);
    }
}
