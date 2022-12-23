import { useTranslation } from 'react-i18next';
import { PageTmpl } from '@gui/templates';
import { Default } from '@gui/layouts';

export const CookiesPolicy = () => {
  const { t } = useTranslation();

  return (
    <Default>
      <PageTmpl title={t('Cookies Policy Page Title')}>{t('Cookies Policy Page Content')}</PageTmpl>
    </Default>
  );
};

export default CookiesPolicy;
