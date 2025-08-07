import { useMemo } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useSettingStore } from '@chatt/state';
import { getTheme } from '../theme';
import HomePage from '../components/HomePage/HomePage';

export default function App() {
  const themeMode = useSettingStore((state) => state.themeMode);
  const theme = useMemo(() => getTheme(themeMode), [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HomePage />
    </ThemeProvider>
  );
}
