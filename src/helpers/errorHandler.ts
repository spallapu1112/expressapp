import { NextFunction, Request, Response } from 'express';

/*
  Not Found Error Handler
  If we hit a route that is not found, we mark it as 404 and pass it along to the next error handler to display
*/
export const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({ success: false, error: 'endpoint not found' });
};
