import { combineReducers } from 'redux';
import {
  GLOBAL_SETTINGS_KEY,
  GlobalSettingsState,
  globalSettingsReducer,
  // imports
} from '@gui/reducers';

export interface StoreState {
  [GLOBAL_SETTINGS_KEY]: GlobalSettingsState;
  // state
}

export const reducers = combineReducers<StoreState>({
  [GLOBAL_SETTINGS_KEY]: globalSettingsReducer,
  // reducers
});
