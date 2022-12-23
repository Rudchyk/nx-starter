import { useEffect, FC, ReactElement } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { defaultLanguage } from '@constants';
import { selectGlobalSettingsState } from '@gui/reducers';
import { useSelector } from 'react-redux';
import resources from '../../../translations';

i18n.use(initReactI18next).init({
  lng: defaultLanguage,
  fallbackLng: defaultLanguage,
  debug: process.env.NODE_ENV !== 'production',
  interpolation: {
    escapeValue: false,
  },
  resources,
});

export interface LocalizationProviderProps {
  children: ReactElement;
}

export const LocalizationProvider: FC<LocalizationProviderProps> = ({ children }) => {
  const { language } = useSelector(selectGlobalSettingsState);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return children;
};

export default LocalizationProvider;
