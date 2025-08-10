import { useEffect, useState } from 'react';
import { supabase } from '@frontend/supabase';

export const useUser = () => {
  const [user, setUser] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

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

  useEffect(() => {
    setIsLoggedIn(user !== null);
  }, [user]);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return { user, isLoggedIn, logout };
};
