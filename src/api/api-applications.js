import { supabaseClient } from '@/utils/supabase';

export async function getApplications(token, { user_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from('applications')
    .select('*, job:jobs(title, company:companies(name))')
    .eq('candidate_id', user_id);

  if (error) {
    console.error('Error fetching applications:', error);
    return [];
  }

  return data;
}
