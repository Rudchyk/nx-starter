import { FC, useMemo } from 'react';
import { ApolloError, ServerError } from '@apollo/client';
import { Alert, AlertTitle, AlertColor } from '@mui/material';

export interface FormAlertProps {
  error?: ApolloError | Error;
  severity?: AlertColor;
}

export const FormAlert: FC<FormAlertProps> = ({ error, severity = 'error' }) => {
  if (!error) {
    return null;
  }

  const data = useMemo(() => {
    const { networkError } = error as ApolloError;

    if (networkError) {
      const { message, name, result } = networkError as ServerError;
      return {
        name,
        message,
        errors: result.errors || [],
      };
    } else {
      return {
        name: null,
        message: error.message,
        errors: [],
      };
    }
  }, [error]);

  return (
    <Alert sx={{ mb: 3 }} severity={severity}>
      {data.name ? (
        <>
          <AlertTitle>{data.name}</AlertTitle>
          <p>{data.message}</p>
        </>
      ) : (
        <AlertTitle>{data.message}</AlertTitle>
      )}
      {Boolean(data.errors.length) && (
        <ol>
          {data.errors.map(({ message }: any) => (
            <li>{message}</li>
          ))}
        </ol>
      )}
    </Alert>
  );
};

export default FormAlert;
