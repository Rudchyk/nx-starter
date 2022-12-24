import { ServerRootRoutesEnum } from '@constants';
import { OpenAPIV3 } from 'openapi-types';
import { apiRoutes } from './api/index';

interface SecuritySchemes {
  [key: string]: OpenAPIV3.SecuritySchemeObject;
}

const securitySchemes: SecuritySchemes = {
  basicAuth: {
    type: 'http',
    scheme: 'basic',
    description: 'Basic Authentication',
  },
};

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
  components: {
    securitySchemes,
  },
  paths: {
    ...apiRoutes.apiDoc,
  },
};

export const operations = {
  ...apiRoutes.operation,
};
