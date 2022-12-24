import { Request, Response, NextFunction } from 'express';
import { creds } from '@constants';
import createError from 'http-errors';

export const basicAuthValidator = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = req.get('authorization');

    if (!auth) {
      res.set('WWW-Authenticate', 'Basic realm="Authorization Required"');
      return res.status(401).send('Authorization Required');
    } else {
      const [login, pass] = Buffer.from(auth.split(' ').pop() as string, 'base64')
        .toString('ascii')
        .split(':');

      if (login === creds.login && pass === creds.pass) {
        return next();
      } else {
        res.set('WWW-Authenticate', 'Basic realm="Authorization Required"');
        return res.status(401).send('Access Denied (incorrect credentials)');
      }
    }
  } catch (error) {
    return next(createError(401, (error as any).message));
  }
};
