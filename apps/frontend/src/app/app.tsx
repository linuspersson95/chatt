import { useAuthStore } from '@chatt/state';

export function App() {
  const loggedIn = useAuthStore((state) => state.user) !== null;
  if (loggedIn) return <h1>Du är inloggad!</h1>;
  return <h1>Du är inte inloggad</h1>;
}

export default App;
