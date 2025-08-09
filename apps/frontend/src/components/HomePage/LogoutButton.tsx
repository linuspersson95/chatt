import { Button } from '@mui/material';
import { supabase } from '../../supabase-client';

export default function LogoutButton() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return <Button onClick={handleLogout}>Logga ut</Button>;
}
