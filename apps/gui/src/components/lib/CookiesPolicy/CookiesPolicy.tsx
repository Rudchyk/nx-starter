import { Alert, AlertTitle } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { UILink, UIButton } from '@ui';
import { Trans, useTranslation } from 'react-i18next';
import { GuiRoutesEnum } from '@constants';
import Stack from '@mui/material/Stack';
import { setCookiesPolicy, selectGlobalSettingsState } from '@gui/reducers';
import { useDispatch, useSelector } from 'react-redux';

export const CookiesPolicy = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isCookiesAccepted } = useSelector(selectGlobalSettingsState);

  const onDecline = () => {
    dispatch(setCookiesPolicy(false));
  };
  const onAccept = () => {
    dispatch(setCookiesPolicy(true));
  };

  return (
    <Snackbar open={isCookiesAccepted === null}>
      <Alert
        elevation={6}
        variant="filled"
        severity="info"
        action={
          <Stack direction="row" alignItems="center" spacing={1}>
            <UIButton onClick={onDecline} disableElevation color="inherit" variant="outlined" size="small">
              {t('Decline Cookies')}
            </UIButton>
            <UIButton onClick={onAccept} disableElevation color="inherit" variant="outlined" size="small">
              {t('Accept Cookies')}
            </UIButton>
          </Stack>
        }>
        <AlertTitle>{t('Cookies Policy Alert Title')}</AlertTitle>
        <Trans
          i18nKey="Cookies Policy Alert Content"
          values={{
            linkText: t('Cookies Policy Link Title'),
          }}
          components={[<UILink color="inherit" to={GuiRoutesEnum.COOKIES_POLICY} title={t('Cookies Policy Link Title') as string} />]}
        />
      </Alert>
    </Snackbar>
  );
};

export default CookiesPolicy;
