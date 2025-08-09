import { Button } from '@mui/material';
import { supabase } from '../../supabase-client';

export default function LoginButton() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Inloggning misslyckades', error.message);
      return;
    }
  };
  return <Button onClick={handleLogin}>Logga in</Button>;
}
