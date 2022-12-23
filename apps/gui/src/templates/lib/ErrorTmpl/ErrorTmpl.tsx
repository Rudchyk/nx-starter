import { ReactNode, FC } from 'react';
import { HomeButton } from '@gui/components';
import { Box, SxProps, Theme, Typography } from '@mui/material';

export interface ErrorTmplProps {
  title: string;
  text?: string | number;
  isHomeButton?: boolean;
  children?: ReactNode;
  sx?: SxProps<Theme>;
}

export const ErrorTmpl: FC<ErrorTmplProps> = ({ children, title, text, isHomeButton = true, sx = {} }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', ...sx }}>
      <Typography variant="h3" component="p" align="center">
        {title}
      </Typography>
      {text && (
        <Typography variant="h1" sx={{ fontSize: '220px' }} component="p" align="center">
          {text}
        </Typography>
      )}
      {children}
      {isHomeButton && (
        <Box sx={{ textAlign: 'center' }}>
          <HomeButton />
        </Box>
      )}
    </Box>
  );
};

export default ErrorTmpl;
