import { createTransport } from 'nodemailer';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';

export const {
  NX_MAIL_HOST: smtpHost,
  NX_MAIL_PORT: smtpPort,
  NX_MAIL_USER: smtpAuthUser,
  NX_MAIL_PASS: smtpAuthPass,
  NX_MAIL_TEST_RECIPIENT: smtpTestRecipient,
} = process.env;

export const smtpTransporter = createTransport({
  host: smtpHost,
  port: smtpPort || 465,
  secure: true,
  auth: {
    user: smtpAuthUser,
    pass: smtpAuthPass,
  },
  logger: true,
});

export const getMailContentToSend = (tmplName: string, replacements: Record<string, string>, isHtml = false) => {
  const filePath = path.resolve(__dirname, `assets/emails/${tmplName}/${tmplName}.${isHtml ? 'html' : 'text'}.hbs`);
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);

  return template(replacements);
};
