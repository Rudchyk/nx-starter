import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@gui/store';
import { LanguagesKeysEnum, defaultLanguage, ThemeModesEnum, defaultThemeMode } from '@constants';

export const GLOBAL_SETTINGS_KEY = 'globalSettings';

export interface GlobalSettingsState {
  themeMode: ThemeModesEnum;
  isCookiesAccepted: boolean | null;
  language: LanguagesKeysEnum;
}

const initialState: GlobalSettingsState = {
  themeMode: defaultThemeMode,
  isCookiesAccepted: null,
  language: defaultLanguage,
};

export const selectGlobalSettingsState = (state: RootState): GlobalSettingsState => state[GLOBAL_SETTINGS_KEY];

export const globalSettingsSlice = createSlice({
  name: GLOBAL_SETTINGS_KEY,
  initialState,
  reducers: {
    setLanguage: (state, { payload }: PayloadAction<LanguagesKeysEnum>) => {
      state.language = payload;
    },
    setThemeMode: (state, { payload }: PayloadAction<ThemeModesEnum>) => {
      state.themeMode = payload;
    },
    setCookiesPolicy: (state, { payload }: PayloadAction<boolean>) => {
      state.isCookiesAccepted = payload;
    },
  },
});

export const { setLanguage, setThemeMode, setCookiesPolicy } = globalSettingsSlice.actions;

export const globalSettingsReducer = globalSettingsSlice.reducer;
