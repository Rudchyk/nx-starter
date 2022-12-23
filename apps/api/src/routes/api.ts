import { ServerRootRoutesEnum } from '@constants';
import { apiRoutes } from './api/index';

export const apiDoc = {
  openapi: '3.0.2',
  servers: [
    {
      url: ServerRootRoutesEnum.API,
    },
  ],
  info: {
    title: 'API',
    description: 'This is a API',
    version: '0.0.1',
  },
  paths: {
    ...apiRoutes.apiDoc,
  },
};

export const operations = {
  ...apiRoutes.operation,
};
