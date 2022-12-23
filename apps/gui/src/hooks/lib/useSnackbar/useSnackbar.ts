import { useSnackbar as useNotistackSnackbar } from 'notistack';

export const useSnackbar = () => {
  const { enqueueSnackbar } = useNotistackSnackbar();

  const fireSuccessfulSnack = (msg: string) => enqueueSnackbar(msg, { variant: 'success' });
  const fireErrorSnack = (msg: string) => enqueueSnackbar(msg, { variant: 'error' });

  return {
    fireSuccessfulSnack,
    fireErrorSnack,
  };
};
