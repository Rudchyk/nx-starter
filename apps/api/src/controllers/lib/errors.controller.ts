import { Request, Response, NextFunction } from 'express';
import { logger } from '@api/services';

export const errorsController = async (err: any, req: Request, res: Response, next: NextFunction) => {
  const isRestrictedErrors = [404, 406].includes(err.status);

  if (!isRestrictedErrors) {
    logger.error('[errorsController]', err.message || err);
  }

  res.status(err.status || 500).json(err);
};
