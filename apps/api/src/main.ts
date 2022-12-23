import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errorsController } from '@api/controllers';
import { isDev } from '@api/constants';
import {
  initCleaningPasswordResets,
  mongooseSetup,
  normalizePort,
  sessionSetup,
  graphqlSetup,
  getServerLauncher,
  onError,
  onListening,
  setupProdApp,
} from '@api/services';

import { setupRoutes } from './routes/routes';

const setup = async () => {
  const PORT = process.env.port || '3333';
  const app = express();
  const port = normalizePort(PORT);

  mongooseSetup();

  app.set('port', port);

  sessionSetup(app);

  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  setupRoutes(app);
  graphqlSetup(app);

  app.use(errorsController);

  if (!isDev) {
    setupProdApp(app);
  }

  initCleaningPasswordResets();

  const serverLauncher = getServerLauncher(app);
  const server = serverLauncher.listen(port);

  server.on('error', onError(port));
  server.on('listening', onListening(server, app));
};

setup();
