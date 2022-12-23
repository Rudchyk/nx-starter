import { ReactNode, FC } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { BackButton } from '@gui/components';

export interface PageTmplProps {
  title?: string | null;
  children?: ReactNode;
  tools?: ReactNode;
  titleTools?: ReactNode;
  backButton?: boolean;
}

export const PageTmpl: FC<PageTmplProps> = ({ children, title, tools, backButton, titleTools }) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {title && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {backButton && <BackButton />}
            <Typography variant="h2" component="h1">
              {title}
            </Typography>
            {titleTools}
          </Box>
          {tools}
        </Box>
      )}
      {children}
    </Container>
  );
};

export default PageTmpl;
