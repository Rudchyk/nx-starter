import { DocumentNode, MutationResult, useMutation } from '@apollo/client';
import { AUTH_USER } from '@gui/queries';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { GuiRoutesEnum } from '@constants';
import { useSnackbar } from '@gui/hooks';
import { jwsSign } from '@utils';

export const useAuthMutation = (mutation: DocumentNode): [(formData: any) => Promise<void>, MutationResult<any>] => {
  const navigate = useNavigate();
  const { fireSuccessfulSnack } = useSnackbar();
  const [mutationAction, mutationData] = useMutation(mutation, {
    refetchQueries: [{ query: AUTH_USER }],
  });

  const onSubmit = async (formData: any) => {
    try {
      await mutationAction({
        variables: {
          token: await jwsSign(formData),
        },
      });
    } catch (error: any) {
      console.warn(`[${mutation} onSubmit]`, error);
    }
  };

  useEffect(() => {
    const { data } = mutationData;

    if (data) {
      let msg = '';

      if (data.login) {
        msg = `${data.login.email} is logged in`;
      } else if (data.signup) {
        msg = `${data.signup.email} is registered and logged in`;
      }

      fireSuccessfulSnack(msg);
      navigate(GuiRoutesEnum.HOME, { replace: true });
    }
  }, [mutationData.data]);

  return [onSubmit, mutationData];
};
