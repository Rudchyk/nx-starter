import { UIButton } from '@ui';
import { GuiRoutesEnum } from '@constants';
import HomeIcon from '@mui/icons-material/Home';

export const HomeButton = ({ ...other }) => {
  return (
    <UIButton size="small" to={GuiRoutesEnum.HOME} startIcon={<HomeIcon />} {...other}>
      Home
    </UIButton>
  );
};

export default HomeButton;
