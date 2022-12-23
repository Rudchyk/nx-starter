import { Request, Response } from 'express';
import { logger } from '@api/services';
import { ServerRootRoutesEnum } from '@constants';

export const error404Controller = (req: Request, res: Response) => {
  logger.info('[error404Controller]', req.method, req.url, `404`);
  res.redirect(ServerRootRoutesEnum.HOME);
};
