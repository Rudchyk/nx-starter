import { ReactNode, FC } from 'react';
import Box from '@mui/material/Box';
import { Breakpoint, Container } from '@mui/material';
import { SimpleHeader, Footer } from '@gui/components';

export interface SimpleProps {
  children: ReactNode;
  maxWidth?: Breakpoint;
}

export const Simple: FC<SimpleProps> = ({ children, maxWidth }) => {
  return (
    <Box sx={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <SimpleHeader />
      <Container
        component="main"
        maxWidth={maxWidth}
        sx={{
          py: 3,
          flexGrow: 1,
        }}>
        {children}
      </Container>
      <Footer sx={{ py: 3, px: 2, mt: 'auto' }} />
    </Box>
  );
};

export default Simple;
