import { UIButton } from '@ui';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <UIButton icon onClick={() => navigate(-1)} sx={{ mr: 2 }} size="large" color="primary">
      <ArrowBackIosNewIcon />
    </UIButton>
  );
};

export default BackButton;
