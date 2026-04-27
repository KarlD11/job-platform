import { supabaseClient } from '@/utils/supabase';

// Function to get jobs with optional filters
export async function getJobs(token, { location, company_id, searchQuery, id, saved, recruiter_id }) {
  const supabase = await supabaseClient(token);
  let query = supabase.from('jobs').select('*, company:companies(name), saved:saved_jobs(id, user_id)');

  if (id) query = query.eq('id', id);
  if (location) query = query.eq('location', location);
  if (company_id) query = query.eq('company_id', company_id);
  if (searchQuery) query = query.ilike('title', `%${searchQuery}%`);
  if (recruiter_id) query = query.eq('recruiter_id', recruiter_id);
  if (saved) query = query.not('saved_jobs', 'is', null);

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }

  return data;
}

// Function to get a single job by job_id with full details
export async function getSingleJob(token, { job_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from('jobs')
    .select('*, company:companies(name), applications:applications(*)')
    .eq('id', job_id)
    .single();

  if (error) {
    console.error('Error fetching job details:', error);
    return null;
  }

  return data;
}

// Function to get saved jobs for a user
export async function getSavedJobs(token, { user_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from('saved_jobs')
    .select('*, job:jobs(*, company:companies(name))')
    .eq('user_id', user_id);

  if (error) {
    console.error("Error fetching saved jobs:", error);
    return [];
  }

  return data.map(item => item.job);
}


// Function to save or unsave a job
export async function savedJobs(token, saveRequest ) {
  const { alreadySaved, user_id, job_id } = saveRequest;
  const supabase = await supabaseClient(token);

  if (alreadySaved) {
      const { data, error } = await supabase
      .from('saved_jobs')
      .delete()
      .eq("job_id", job_id)
      .eq("user_id", user_id);
      
      if (error) {
        console.error("Error deleting job:", error);
        return null;
      }

      return data;

  } else {
    const { data, error } = await supabase
      .from('saved_jobs')
      .insert({ user_id, job_id })
      .select();

      if (error) {
        console.error("Error inserting job:", error);
        return null;
      }

      return data;
  }

}

export async function applyJob(token, applicationData) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from('applications')
    .insert(applicationData)
    .select();

  if (error) {
    console.error('Error applying for job:', error);
    return null;
  }

  return data;
}

// Function to post a new job
export async function postJob(token, jobData) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from('jobs')
    .insert(jobData)
    .select();

  if (error) {
    console.error('Error posting job:', error);
    return null;
  }

  return data;
}





//     if (insertError) {
//       console.error("Error inserting saved job:", insertError);
//       return null;
//     }

//     return null;

//   }

//   return data;
// }







// import supabaseClient from '@/utils/supabase';

// export async function getJobs (token, { location, company_id, searchQuery}) {
//     const supabase = await supabaseClient(token);

//     let query = supabase.from('jobs').select('*');

//     if (location) {
//         query = query.eq('location', location);
//     }

//         if (company_id) {
//         query = query.eq('company_id', company_id);
//     }

//         if (searchQuery) {
//         query = query.ilinke('title', `%${searchQuery}%`);
//     }

//     const { data, error } = await query;

//     if (error) {
//         console.error("Erro0r fetching jobs:", error);
//         return null;
//     }

//     return data;
// } 