import { useEffect, useState } from 'react';
import { Typography, Container, Button, CircularProgress } from '@mui/material';
import { useAuthStore, useGetMessageFromBE } from '@chatt/state';
import { useTranslation } from 'react-i18next';
import SpeedDial from './SpeedDial';
import LanguageSelectorDialog from './LanguageSelector';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { supabase } from '../../supabase-client';
import type { User } from '@supabase/supabase-js';

const useUser = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user?.email ?? null);
      },
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return user;
};

export default function HomePage() {
  const { t } = useTranslation();
  const isLoggedIn = useAuthStore((state) => state.user) !== null;
  const loggedInUser = useAuthStore((state) => state.user);
  const logOutUser = useAuthStore((state) => state.logout);
  const logInUser = useAuthStore((state) => state.login);
  const user = useUser();

  // const { isLoading, data, isSuccess, refetch } = useGetMessageFromBE();

  // const handleOnClick = () => {
  //   if (isLoggedIn) {
  //     logOutUser();
  //     return;
  //   }
  //   logInUser('Linus');
  //   return;
  // };

  const loggedIn = user !== null;

  useEffect(() => {
    console.log('inloggad användare: ', user);
  }, [user]);

  return (
    <Container sx={{ minHeight: '100vh' }}>
      <Typography component="h1" variant="h1">
        {t('welcome')}
      </Typography>
      <Typography component="h2" variant="h2">
        {loggedIn ? `Du är inloggad som ${user}` : 'Du är inte inloggad'}
      </Typography>
      {loggedIn ? <LogoutButton /> : <LoginButton />}
      {/* {isLoading && <CircularProgress />}
      {isSuccess && <Typography>{data}</Typography>}
      <Button onClick={() => refetch()}>Hämta igen</Button> */}
      <SpeedDial />
      <LanguageSelectorDialog />
    </Container>
  );
}
