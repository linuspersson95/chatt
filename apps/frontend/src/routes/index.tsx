import { redirect, createFileRoute } from '@tanstack/react-router';
import { StartPage } from '@frontend/components';
import { supabase } from '@frontend/supabase';

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const user = await supabase.auth.getUser();
    console.log('user', user);
    if (user.data.user) {
      throw redirect({ to: '/chat' });
    }
  },
  component: StartPage,
});
