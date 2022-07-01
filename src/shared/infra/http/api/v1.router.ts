import Router from 'express-promise-router';
import { Request, Response } from 'express';
import errorHandler from 'errorhandler';
import httpStatus from 'http-status';

const v1Router = Router();
v1Router.use(errorHandler());

v1Router.get('/', (req: Request, res: Response) =>
  res.status(200).json({ message: 'We are up an running!' })
);

v1Router.use((err: Error, req: Request, res: Response) => {
  console.log(err);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
});

export default v1Router;
