import { ServerRootRoutesEnum } from '@constants';

export const getServerApiRoute = (path = '') => `${ServerRootRoutesEnum.API}${path}`;
