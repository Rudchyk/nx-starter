import { useSelector, useDispatch } from 'react-redux';
import { UIButton } from '@ui';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { selectGlobalSettingsState, setThemeMode } from '@gui/reducers';
import { ThemeModesEnum } from '@constants';

export const ThemeModeSwitcher = () => {
  const dispatch = useDispatch();
  const { themeMode } = useSelector(selectGlobalSettingsState);
  const isDarkMode = () => themeMode === ThemeModesEnum.DARK;
  const onChangeThemeClick = () => {
    dispatch(setThemeMode(isDarkMode() ? ThemeModesEnum.LIGHT : ThemeModesEnum.DARK));
  };

  return (
    <UIButton icon onClick={onChangeThemeClick} color="inherit">
      {isDarkMode() ? <Brightness7Icon /> : <Brightness4Icon />}
    </UIButton>
  );
};

export default ThemeModeSwitcher;
