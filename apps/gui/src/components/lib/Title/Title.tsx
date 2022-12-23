import Typography, { TypographyProps } from '@mui/material/Typography';
import { FC } from 'react';

type TitleProps = TypographyProps;

export const Title: FC<TitleProps> = (props) => (
  <Typography {...(props as any)} component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
    NX Starter
  </Typography>
);

export default Title;
