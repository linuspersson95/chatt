import { HomePage, Menu } from '@chatt/ui';
import { useAuthStore } from '@chatt/state';

export function App() {
  const loggedIn = useAuthStore((state) => state.user) !== null;
  if (loggedIn) return <Menu />;
  return <HomePage />;
}

export default App;
