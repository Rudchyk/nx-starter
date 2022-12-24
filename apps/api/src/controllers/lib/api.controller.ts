import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

export const apiController = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({
      cookies: req.cookies,
      session: req.session,
      headers: req.headers,
      test: 'hello',
      NODE_ENV: process.env.NODE_ENV,
    });
  } catch (error) {
    return next(createError(error.status || 400, error.message));
  }
};
