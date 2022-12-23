import { useEffect, FC, ReactElement } from 'react';
import { CookiesPolicy } from '@gui/components';
import { StoredCookiesEnum } from '@constants';
import { selectGlobalSettingsState, setLanguage, setThemeMode } from '@gui/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { useCookie } from '@rch';
export interface CookieProviderProps {
  children: ReactElement;
}

export const CookieProvider: FC<CookieProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { isCookiesAccepted, themeMode, language } = useSelector(selectGlobalSettingsState);
  const [storedThemeMode, updateStoredThemeMode, removeStoredThemeMode] = useCookie(StoredCookiesEnum.THEME_MODE, themeMode);
  const [storedLanguage, updateStoredLanguage, removeStoredLanguage] = useCookie(StoredCookiesEnum.LANGUAGE, language);

  useEffect(() => {
    if (storedLanguage) {
      dispatch(setLanguage(storedLanguage));
    }
    if (storedThemeMode) {
      dispatch(setThemeMode(storedThemeMode));
    }
  }, []);

  useEffect(() => {
    updateStoredThemeMode(themeMode);
  }, [themeMode]);

  useEffect(() => {
    updateStoredLanguage(language);
  }, [language]);

  useEffect(() => {
    if (isCookiesAccepted === false) {
      removeStoredThemeMode();
      removeStoredLanguage();
    }
  }, [isCookiesAccepted]);

  return (
    <>
      {children}
      <CookiesPolicy />
    </>
  );
};

export default CookieProvider;
