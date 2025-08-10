import { redirect, createFileRoute } from '@tanstack/react-router';
import { ChatPage } from '@frontend/components';
import { supabase } from '@frontend/supabase';

export const Route = createFileRoute('/chat')({
  beforeLoad: async () => {
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      throw redirect({ to: '/' });
    }
  },
  component: ChatPage,
});
