import passport from 'passport';
import { Request } from 'express';
import LocalStrategy from 'passport-local';
import { UserModel, UserSchemaInterface, PasswordResetModel, PasswordResetSchemaInterface } from '@api/models';
import randomstring from 'randomstring';
import moment from 'moment';
import {
  getMailContentToSend,
  smtpTransporter,
  smtpAuthUser,
  smtpTestRecipient,
  logger,
  addUser,
  verifyToken,
  decodeSecuredStr,
  getSecuredStr,
  getHash,
  getUser,
} from '@api/services';
import { isDev } from '@api/constants';

passport.serializeUser(({ id }, done) => {
  done(null, id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);

    done(null, user);
  } catch (error) {
    done(error, false, 'Can not deserialize User');
  }
});

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user: any = await UserModel.findOne({ email });

      if (!user) {
        throw new Error(`User with email: ${email} doesn't exist`);
      }

      if (!user.comparePasswords(password)) {
        throw new Error(`Password for user: ${email} is invalid`);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

export const signup = async ({ token, req }) => {
  try {
    const {
      headers: { origin },
    } = req;

    const user = await addUser({ token, origin });

    return new Promise((resolve, reject) => {
      req.login(user, (err) => {
        if (err) {
          reject(err);
        }

        resolve(user);
      });
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const login = async ({ token, req }) => {
  try {
    const user = await verifyToken(token);

    if (req.user && req.user.email === user.email) {
      throw new Error(`the user: ${user.email} is already logged in`);
    }

    return new Promise((resolve, reject) => {
      passport.authenticate('local', (err, user, message) => {
        if (err) {
          reject(err);
        }

        if (!user && message) {
          reject(message);
        } else if (!user && !message) {
          reject('Invalid credentials');
        }

        req.login(user, (err) => {
          if (err) {
            reject(err);
          }

          resolve(user);
        });
      })({ body: user });
    });
  } catch (error) {
    return error;
  }
};

export const logout = async (req) => {
  const { user } = req;

  return new Promise((resolve, reject) => {
    req.logout((err) => {
      if (err) {
        reject(err);
      }

      resolve(`The user: ${user.email} is successfully logged out`);
    });
  });
};

export const confirmEmail = async (code: string) => {
  try {
    const securedStr = decodeSecuredStr(code);
    const [email, emailConfirmedCode] = securedStr;

    if (securedStr.length !== 2) {
      throw new Error(`The confirmation code is not valid!`);
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error(`User ${email} does not exist!`);
    } else if (user.emailConfirmedAt) {
      throw new Error(`Email ${email} is already confirmed`);
    } else if (user.emailConfirmedCode !== emailConfirmedCode) {
      throw new Error(`The confirmation code for user ${email} is not valid!`);
    }

    await user.update({
      emailConfirmedCode: null,
      emailConfirmedAt: new Date(),
    });

    return user.email;
  } catch (error) {
    throw new Error(error);
  }
};

export const resendConfirmationEmail = async (id, req) => {
  try {
    const {
      headers: { origin },
    } = req;

    const user = await getUser(id);

    await sendConfirmationEmail(user, origin);

    return `Confirmation Email was sent to ${user.email}`;
  } catch (error) {
    throw new Error(error);
  }
};

export const sendConfirmationEmail = async ({ email, emailConfirmedCode, createdAt }: UserSchemaInterface, host: string) => {
  try {
    const tmplName = 'confirm-account';
    const replacements = {
      url: `${host}/confirmEmail/${getSecuredStr(`${email}:${emailConfirmedCode}`)}`,
      email,
      createdAt: moment(createdAt).format('DD/MM/YYYY'),
    };

    const { messageId } = await smtpTransporter.sendMail({
      from: `"${smtpAuthUser}" <${smtpAuthUser}>`,
      to: isDev ? smtpTestRecipient : email,
      subject: 'Confirm your account ✔',
      text: getMailContentToSend(tmplName, replacements).toString(),
      html: getMailContentToSend(tmplName, replacements, true).toString(),
    });
    logger.success(`[sendConfirmationEmail]`, `Confirmation email was sent (ID: ${messageId})`);
  } catch (error) {
    logger.error(`[sendConfirmationEmail]`, error.message);
  }
};

export const initCleaningPasswordResets = async () => {
  try {
    const interval = 1000 * 60 * 60 * 24;

    await cleanPasswordResets();

    setInterval(cleanPasswordResets, interval);
  } catch (error) {
    logger.error(error);
  }
};

export const cleanPasswordResets = async () => {
  try {
    const { deletedCount } = await PasswordResetModel.deleteMany({});

    logger.info(`PasswordResetModels cleaned! Deleted: ${deletedCount}`);
  } catch (error) {
    throw new Error(`[cleanPasswordResets] ${error.message}`);
  }
};

export const sendForgotPasswordEmail = async ({ email, code }: PasswordResetSchemaInterface, host: string) => {
  try {
    const tmplName = 'forgot-password';
    const replacements = {
      url: `${host}/resetPassword/${code}`,
      email,
    };

    const { messageId } = await smtpTransporter.sendMail({
      from: `"${smtpAuthUser}" <${smtpAuthUser}>`,
      to: isDev ? smtpTestRecipient : email,
      subject: 'Reset your password ✔',
      text: getMailContentToSend(tmplName, replacements).toString(),
      html: getMailContentToSend(tmplName, replacements, true).toString(),
    });
    logger.success(`[sendForgotPasswordEmail]`, `Forgot Password email was sent (ID: ${messageId})`);
  } catch (error) {
    logger.error(`[sendForgotPasswordEmail]`, error.message);
  }
};

export const forgotPassword = async (email: string, req: Request) => {
  try {
    const {
      headers: { origin },
    } = req;
    const existingReset = await PasswordResetModel.findOne({ email });

    if (existingReset) {
      throw new Error(`Password reset link has already sent to email: ${email}`);
    }

    const code = randomstring.generate(72);
    const createdAt = new Date();
    const passwordReset = await PasswordResetModel.create({
      code,
      email,
      createdAt,
    });

    await sendForgotPasswordEmail(passwordReset, origin);

    return `Reset link for password sent to ${email}`;
  } catch (error) {
    throw new Error(error);
  }
};

export const verifyResetPassword = async (code: string) => {
  try {
    const existingReset: any = PasswordResetModel.findOne({ code });

    if (!existingReset) {
      throw new Error('Invalid reset code');
    }
    const timeInMinutes = Math.ceil((new Date().getTime() - new Date(existingReset.createdAt).getTime()) / 6000);

    if (timeInMinutes > 5) {
      await PasswordResetModel.findOneAndDelete({ code });
      throw new Error('Reset token expired');
    }

    return existingReset;
  } catch (error) {
    throw new Error(error);
  }
};

export const resetPassword = async (token) => {
  try {
    const { id, email, password } = await verifyToken(token);

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error(`User: ${email} doesn't exist`);
    }

    await user.update({
      password: getHash(password),
    });

    await PasswordResetModel.findByIdAndDelete(id);

    return `The password for user ${email} is successfully reset`;
  } catch (error) {
    throw new Error(error);
  }
};

export const changePassword = async (token, req) => {
  try {
    const { id, oldPassword, password: newPassword } = await verifyToken(token);
    const user: any = await getUser(id);

    if (!user.comparePasswords(oldPassword)) {
      throw new Error(`Old password for user ${user.email} is invalid`);
    }

    await user.update({
      password: getHash(newPassword),
    });

    await logout(req);

    return `The password for user was successfully changed`;
  } catch (error) {
    throw new Error(error);
  }
};
