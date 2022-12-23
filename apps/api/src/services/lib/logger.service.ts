import { WinstonReporter, FancyReporter, Consola } from 'consola';
import { transports, format } from 'winston';

const { combine, timestamp, label, printf } = format;

export const logger = new Consola({
  level: 6,
  reporters: [
    new WinstonReporter({
      format: combine(
        timestamp({ format: 'MMMM Do YYYY, HH:mm:ss' }),
        label({ label: process.env.NODE_ENV }),
        printf(({ level, timestamp, message, label }) => {
          return `${timestamp} - [${level.toUpperCase().padEnd(7)}] - ${JSON.stringify(message)} (${label})`;
        })
      ),
      transports: [
        new transports.File({
          dirname: 'logs',
          filename: 'server.log',
          level: 'info',
        }),
      ],
    }),
    new FancyReporter(),
  ],
});

export const getLoggerMsg = (msg: string, key?: string) => `${key ? `[${key}]: ` : ''}${msg}`;

export const logErr = (msg: string, key?: string) => logger.error(getLoggerMsg(msg, key));

export const logWarn = (msg: string, key?: string) => logger.warn(getLoggerMsg(msg, key));
