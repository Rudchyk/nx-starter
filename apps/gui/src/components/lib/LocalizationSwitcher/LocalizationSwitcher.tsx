import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState, FC } from 'react';
import { UIButton } from '@ui';
import { LanguagesKeysEnum } from '@constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectGlobalSettingsState, setLanguage } from '@gui/reducers';
import { Box, BoxProps } from '@mui/material';

type LocalizationSwitcher = BoxProps;

export const LocalizationSwitcher: FC<LocalizationSwitcher> = (props) => {
  const dispatch = useDispatch();
  const { language } = useSelector(selectGlobalSettingsState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onMenuItemClick = (languageItem: string) => {
    dispatch(setLanguage(languageItem as LanguagesKeysEnum));
    handleClose();
  };
  const languagesList = Object.values(LanguagesKeysEnum);
  const menuId = 'localizationMenu';
  const btnId = 'localizationButton';

  return (
    <Box {...props}>
      <UIButton
        variant="outlined"
        color="inherit"
        id={btnId}
        disabled={!languagesList.length || languagesList.length === 1}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        {language}
      </UIButton>
      {languagesList.length > 1 && (
        <Menu
          id={menuId}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': btnId,
          }}>
          {languagesList.map(
            (languageItem) =>
              languageItem !== language && (
                <MenuItem key={languageItem} onClick={() => onMenuItemClick(languageItem)}>
                  {languageItem.toUpperCase()}
                </MenuItem>
              )
          )}
        </Menu>
      )}
    </Box>
  );
};

export default LocalizationSwitcher;
