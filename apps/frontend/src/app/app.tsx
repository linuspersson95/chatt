import { StrictMode, useMemo } from 'react';
import { Outlet } from '@tanstack/react-router';
import { CssBaseline, ThemeProvider, Container } from '@mui/material';
import { useSettingStore } from '@frontend/state';
import { QueryProvider } from '@frontend/state';
import { Dialogs, SpeedDial } from '@frontend/components';
import { getTheme } from '../theme';

import '@frontend/translation';

export default function App() {
  const themeMode = useSettingStore((state) => state.themeMode);
  const theme = useMemo(() => getTheme(themeMode), [themeMode]);

  return (
    <StrictMode>
      <QueryProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container sx={{ minHeight: '100vh' }}>
            <Outlet />
            <SpeedDial />
            <Dialogs />
          </Container>
        </ThemeProvider>
      </QueryProvider>
    </StrictMode>
  );
}
