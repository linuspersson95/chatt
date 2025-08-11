import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase_url = process.env.SUPABASE_URL;
const supabase_service_role_key = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabase_url, supabase_service_role_key);

export const checkAuth = async (authorization?: string) => {
  const authHeader = authorization || '';
  const token = authHeader.replace('Bearer ', '');

  const { data, error } = await supabase.auth.getUser(token);

  const { user } = data;

  console.log('user', user);

  return {
    user,
    error,
  };
};
