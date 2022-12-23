import { apiController } from '@api/controllers';
import { ServerApiRoutesEnum } from '@constants';

enum OperationIdsEnum {
  GET = 'getAPIIndex',
}

export const apiRoutes = {
  apiDoc: {
    [ServerApiRoutesEnum.INDEX]: {
      get: {
        summary: 'API',
        operationId: OperationIdsEnum.GET,
        responses: {
          default: {
            description: 'return data',
          },
        },
      },
    },
  },
  operation: {
    [OperationIdsEnum.GET]: [apiController],
  },
};
