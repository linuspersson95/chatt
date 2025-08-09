import { useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Language from '@mui/icons-material/Language';
import LightMode from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode';
import LogOut from '@mui/icons-material/LogOut';
import {
  useSettingStore,
  useDialogStore,
  useAuthStore,
} from '../../global-state';

export default function BasicSpeedDial() {
  const { setThemeMode, themeMode } = useSettingStore((state) => state);
  const { setDialogOpen } = useDialogStore((state) => state);
  const { user, logout } = useAuthStore((state) => state);

  type Action = {
    icon: React.ReactNode;
    name: string;
    onClick: () => void;
  };

  const actions: Action[] = useMemo(
    () =>
      [
        {
          icon: themeMode === 'light' ? <LightMode /> : <DarkMode />,
          name: 'Theme',
          onClick: () => setThemeMode(themeMode === 'light' ? 'dark' : 'light'),
        },
        {
          icon: <Language />,
          name: 'Language',
          onClick: () => setDialogOpen('languageSelector'),
        },
        user !== null && {
          icon: <LogOut />,
          name: 'Log out',
          onClick: logout,
        },
      ].filter(Boolean) as Action[],
    [themeMode, user],
  );

  return (
    <Box sx={{ height: '90vh', transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="Change your language or theme settings"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            slotProps={{ tooltip: { title: action.name } }}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
