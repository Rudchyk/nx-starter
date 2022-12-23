import { ApolloError } from '@apollo/client';

export const getGraphQLErrorData = ({ networkError, message }: any) => {
  const result = {
    message: message,
    status: 400,
  };

  if (networkError) {
    const { statusCode } = networkError as any;
    result.status = statusCode;
  }

  return result;
};
