import { ReactNode, FC } from 'react';
import { Avatar, Box, Grid, GridProps, Stack } from '@mui/material';

interface InfoGridElementProps extends GridProps {
  icon: ReactNode;
  title: string;
  value: ReactNode | string;
}

export const InfoGridElement: FC<InfoGridElementProps> = ({ icon, title, value, ...props }) => {
  return (
    <Grid item {...props}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar>{icon}</Avatar>
        <Box>
          {title}: <strong>{value}</strong>
        </Box>
      </Stack>
    </Grid>
  );
};

export default InfoGridElement;
