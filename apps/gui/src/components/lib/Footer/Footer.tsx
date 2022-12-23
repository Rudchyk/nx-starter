import Typography from '@mui/material/Typography';

export const Footer = (props: any) => {
  const year = new Date().getFullYear();

  return (
    <Typography variant="body2" component="footer" color="text.secondary" align="center" {...props}>
      Copyright © CVBox {year}.
    </Typography>
  );
};

export default Footer;
