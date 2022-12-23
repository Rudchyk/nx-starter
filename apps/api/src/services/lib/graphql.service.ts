import { Express } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { ServerApiRoutesEnum } from '@constants';
import { isDev } from '@api/constants';
import { getServerApiRoute } from '@api/services';
import schema from '../../schema/schema';

export const graphqlSetup = (app: Express) => {
  app.use(
    getServerApiRoute(ServerApiRoutesEnum.GRAPHQL),
    graphqlHTTP({
      schema,
      graphiql: isDev,
    })
  );
};
