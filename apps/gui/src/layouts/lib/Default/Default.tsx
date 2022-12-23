import { ReactNode, FC } from 'react';
import Box from '@mui/material/Box';
import { Breakpoint } from '@mui/material';
import { Sidebar, Header, Footer } from '@gui/components';
import { useToggle } from '@rch';
import Toolbar from '@mui/material/Toolbar';

export interface DefaultProps {
  children: ReactNode;
}

export const Default: FC<DefaultProps> = ({ children }) => {
  const [open, toggleDrawer] = useToggle(true);

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Header open={open} toggleDrawer={toggleDrawer} />
      <Sidebar open={open} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]),
          flexGrow: 1,
          height: '100%',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Toolbar />
        {children}
        <Footer sx={{ py: 3, px: 2, mt: 'auto' }} />
      </Box>
    </Box>
  );
};

export default Default;
