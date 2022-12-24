import { apiController } from '@api/controllers';
import { ServerApiRoutesEnum } from '@constants';
import { basicAuthValidator } from '@api/validators';

enum OperationIdsEnum {
  GET = 'getAPIIndex',
}

export const apiRoutes = {
  apiDoc: {
    [ServerApiRoutesEnum.INDEX]: {
      get: {
        summary: 'API',
        operationId: OperationIdsEnum.GET,
        security: [
          {
            basicAuth: [],
          },
        ],
        responses: {
          default: {
            description: 'return data',
          },
        },
      },
    },
  },
  operation: {
    [OperationIdsEnum.GET]: [basicAuthValidator, apiController],
  },
};
