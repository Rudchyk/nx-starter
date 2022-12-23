import { ReactNode, FC, useMemo, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { StyledEngineProvider } from '@mui/material/styles';
import { selectGlobalSettingsState } from '@gui/reducers';
import { ThemeModesEnum } from '@constants';
import { createTheme, ThemeProvider as MuiThemeProvider, Theme as ThemeInterface } from '@mui/material/styles';
import { useSelector } from 'react-redux';

export const palette = {
  base: {
    main: '#2a3b56',
  },
};

export const components = {};

export interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const { themeMode } = useSelector(selectGlobalSettingsState);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          ...palette,
        },
        components: {
          ...components,
        },
      }),
    [themeMode, palette]
  );

  const createGlobalStyles = (theme: ThemeInterface) => {
    const cssVars: any = {};

    for (const key in theme.palette) {
      if (Object.prototype.hasOwnProperty.call(theme.palette, key)) {
        const element = (theme.palette as any)[key];
        if (element instanceof Object) {
          for (const elementKey in element) {
            if (Object.prototype.hasOwnProperty.call(element, elementKey)) {
              const prop = element[elementKey];
              if (typeof prop === 'string') {
                cssVars[`--${key}-${elementKey}`] = prop;
              }
            }
          }
        }
      }
    }

    return {
      ':root': cssVars,
    };
  };

  useEffect(() => {
    document.body.classList.toggle(ThemeModesEnum.DARK, themeMode === ThemeModesEnum.DARK);
  }, [themeMode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <GlobalStyles styles={createGlobalStyles} />
      <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
