import { Request, Response, NextFunction } from 'express';
// import { smtpTransporter, smtpAuthUser, smtpTestRecipient } from '@api/services';
import createError from 'http-errors';

export const testController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const info = await smtpTransporter.sendMail({
    //   from: smtpAuthUser,
    //   to: smtpTestRecipient,
    //   subject: 'Hello ✔',
    //   text: 'Hello world?',
    //   html: '<b>Hello world?</b>',
    // });

    res.json({
      // mail: info,
      // cookies: req.cookies,
      session: req.session,
      // headers: req.headers,
      NODE_ENV: process.env.NODE_ENV,
    });
  } catch (error) {
    return next(createError(error.status || 400, error.message));
  }
};
