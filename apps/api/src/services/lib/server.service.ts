import { logger } from '@api/services';
import { getConsoleStrColor } from '@api/utils';
import { parseExpressApp } from 'express-route-parser';
import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { mongoInstance, getServerApiRoute } from '@api/services';
import { s, GuiRoutesEnum, ServerApiRoutesEnum, ServerRootRoutesEnum } from '@constants';
import express, { Express } from 'express';
import { isDev } from '@api/constants';
import { error404Controller } from '@api/controllers';
import guiProjectConf from '../../../../gui/project.json';

export const sessionSetup = (app: Express) => {
  app.use(
    session({
      resave: true,
      saveUninitialized: true,
      secret: s.session,
      store: MongoStore.create({
        mongoUrl: mongoInstance,
      }),
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};

export const normalizePort = (val: string) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

export const getCertData = (filename: string, localDirPath = '../cert') => fs.readFileSync(path.join(__dirname, localDirPath, filename)).toString();

export const getServerLauncher = (app: Express, crt?: string, pem?: string) => {
  // return isDev
  //   ? http.createServer(app)
  //   : https.createServer(
  //       {
  //         key: getCertData(crt),
  //         cert: getCertData(pem),
  //       },
  //       app
  //     );
  return http.createServer(app);
};

export const setupProdApp = (app: Express) => {
  const {
    targets: {
      build: {
        options: { outputPath },
      },
    },
  } = guiProjectConf;
  const dirName = outputPath.split('/').pop();
  const guiPath = path.join(__dirname, dirName);

  app.use(express.static(guiPath));
  app.use(error404Controller);
};

export const onError = (port: string | number | false) => (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const getColoredMethod = (method: string) => {
  switch (method) {
    case 'delete':
      return 31;
    case 'post':
      return 36;
    case 'patch':
      return 35;
    default:
      return 32;
  }
};

const getColoredConsoleStr = (method: string) => getConsoleStrColor(method.toUpperCase(), getColoredMethod(method));

const logPath = (method: string, path: string, PATH: string) => logger.info(`Listening ${getColoredConsoleStr(method)} on \x1b[36m${PATH}${path}\x1b[0m`);

const getPathInfo = (app: Express) => {
  const routesMetaData = parseExpressApp(app);
  const {
    targets: {
      serve: {
        options: { port },
      },
    },
  } = guiProjectConf;
  const PATH = `http://localhost:${port}`;

  routesMetaData.forEach(({ path, method }) => {
    logPath(method, path, PATH);
  });
  logPath('get', ServerRootRoutesEnum.API_DOCUMENTATION, PATH);
  logPath('get', getServerApiRoute(ServerApiRoutesEnum.GRAPHQL), PATH);
  logger.success(`Start: \x1b[36m${PATH}\x1b[0m`);
};

export const onListening = (server: any, app: Express) => () => {
  const addr = server.address();
  const port = app.get('port');

  if (addr instanceof Object) {
    if (isDev) {
      getPathInfo(app);
    } else {
      logger.info(`Listening on port ${port}`);
    }
  } else if (typeof addr === 'string') {
    logger.info(`Listening on pipe ${addr}`);
  } else {
    logger.info(`Listening on port ${port}`);
  }
};
