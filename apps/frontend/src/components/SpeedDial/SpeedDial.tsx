import { useMemo } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SettingsIcon from '@mui/icons-material/Settings';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Language from '@mui/icons-material/Language';
import LightMode from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode';
import LogOut from '@mui/icons-material/LogOut';
import { useSettingStore, useDialogStore, useUser } from '@frontend/state';
import type { ThemeMode } from '@frontend/types';

const getOppositeThemeMode = (currentTheme: ThemeMode): ThemeMode =>
  currentTheme === 'light' ? 'dark' : 'light';

export default function BasicSpeedDial() {
  const { setThemeMode, themeMode } = useSettingStore((state) => state);
  const { setDialogOpen } = useDialogStore((state) => state);
  const { isLoggedIn, logout } = useUser();

  type Action = {
    icon: React.ReactNode;
    id: string;
    tooltip: string;
    onClick: () => void;
  };

  const actions: Action[] = useMemo(
    () =>
      [
        {
          icon: themeMode === 'light' ? <DarkMode /> : <LightMode />,
          id: 'action-id-1',
          tooltip: `Change theme to ${getOppositeThemeMode(themeMode)}-mode`,
          onClick: () => setThemeMode(getOppositeThemeMode(themeMode)),
        },
        {
          icon: <Language />,
          id: 'action-id-2',
          tooltip: 'Change language',
          onClick: () => setDialogOpen('languageSelector'),
        },
        isLoggedIn && {
          icon: <LogOut />,
          id: 'action-id-3',
          tooltip: 'Logout',
          onClick: logout,
        },
      ].filter(Boolean) as Action[],
    [themeMode, isLoggedIn],
  );

  return (
    <Box sx={{ height: '90vh', transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="Change your language or theme settings"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SettingsIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.id}
            icon={action.icon}
            slotProps={{ tooltip: { title: action.tooltip } }}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
