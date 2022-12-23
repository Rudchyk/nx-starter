import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider, ThemeProvider, GraphQLProvider, CookieProvider, LocalizationProvider } from '@gui/providers';
import AppRoutes from '../routes/Routes';

export const App = () => {
  return (
    <BrowserRouter>
      <StoreProvider>
        <LocalizationProvider>
          <GraphQLProvider>
            <ThemeProvider>
              <SnackbarProvider maxSnack={10}>
                <CookieProvider>
                  <AppRoutes />
                </CookieProvider>
              </SnackbarProvider>
            </ThemeProvider>
          </GraphQLProvider>
        </LocalizationProvider>
      </StoreProvider>
    </BrowserRouter>
  );
};

export default App;
