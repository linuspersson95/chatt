import { Button } from '@mui/material';
import { useUser } from '@frontend/state';

export default function LogoutButton() {
  const { logout } = useUser();

  return <Button onClick={logout}>Logga ut</Button>;
}
