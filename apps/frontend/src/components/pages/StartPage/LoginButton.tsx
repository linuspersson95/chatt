import { Button } from '@mui/material';
import { supabase } from '@frontend/supabase';

export default function LoginButton() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          prompt: 'select_account',
        },
      },
    });

    if (error) {
      console.error('Inloggning misslyckades', error.message);
      return;
    }
  };
  return <Button onClick={handleLogin}>Logga in med Google</Button>;
}
