import { HomePage, Menu } from '@chatt/ui';
import { useAuthStore } from '@chatt/state';

export function App() {
  const state = useAuthStore((state) => state);
  console.log('state', state);
  const loggedIn = useAuthStore((state) => state.user) !== null;
  if (loggedIn) return <Menu />;
  return <HomePage />;
}

export default App;
