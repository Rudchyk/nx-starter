import { Express } from 'express';
import { initialize } from 'express-openapi';
import swaggerUi from 'swagger-ui-express';
import { ServerRootRoutesEnum, ServerApiRoutesEnum } from '@constants';
import { testController } from '@api/controllers';
import { getServerApiRoute } from '@api/services';
import { apiDoc, operations } from './api';

/**
 * https://spec.openapis.org/oas/v3.0.3.html#tagObject
 * https://swagger.io/docs/specification/paths-and-operations/
 */

export const setupRoutes = (app: Express) => {
  // OpenAPI routes
  initialize({
    app,
    apiDoc,
    operations,
  });

  // OpenAPI UI
  app.use(
    ServerRootRoutesEnum.API_DOCUMENTATION,
    swaggerUi.serve,
    swaggerUi.setup(null, {
      swaggerOptions: {
        url: getServerApiRoute(ServerApiRoutesEnum.API_DOCS),
      },
    })
  );

  app.route(getServerApiRoute(ServerApiRoutesEnum.TEST)).get(testController);
};
