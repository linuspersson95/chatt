import { useEffect } from 'react';
import { Typography, Grid } from '@mui/material';
import { useGetMessageFromBE, useUser } from '@frontend/state';
import { useTranslation } from 'react-i18next';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

export default function StartPage() {
  const { t } = useTranslation();
  const { user, isLoggedIn } = useUser();

  // const { isLoading, data, isSuccess, refetch } = useGetMessageFromBE();

  useEffect(() => {
    console.log('inloggad användare: ', user);
  }, [user]);

  return (
    <Grid container>
      <Grid size={12}>
        <Typography component="h1" variant="h1">
          {t('welcome')}
        </Typography>
      </Grid>
      <Grid size={12}>
        <Typography component="h2" variant="h2">
          {isLoggedIn ? `Du är inloggad som ${user}` : 'Du är inte inloggad'}
        </Typography>
      </Grid>
      <Grid size={12}>{isLoggedIn ? <LogoutButton /> : <LoginButton />}</Grid>
    </Grid>
  );
}
