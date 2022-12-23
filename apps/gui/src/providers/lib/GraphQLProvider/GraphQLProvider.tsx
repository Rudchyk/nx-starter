import { ReactNode, FC } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ServerRootRoutesEnum, ServerApiRoutesEnum } from '@constants';

export interface GraphQLProviderProps {
  children: ReactNode;
}

const httpLink = createHttpLink({
  uri: ServerRootRoutesEnum.API + ServerApiRoutesEnum.GRAPHQL,
});

const authLink = setContext((_, props) => {
  const { headers } = props;

  return {
    headers: {
      ...headers,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const GraphQLProvider: FC<GraphQLProviderProps> = ({ children }) => <ApolloProvider client={client}>{children}</ApolloProvider>;

export default GraphQLProvider;
