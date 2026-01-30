import { supabaseClient } from '@/utils/supabase';

// Function to get jobs with optional filters
export async function getJobs(token, { location, company_id, searchQuery }) {
  console.log("getJobs() called with token:", token);

  const supabase = await supabaseClient(token);
  let query = supabase.from('jobs').select('*, company:companies(name),msaved:saved_jobs(id)');

  if (location) query = query.eq('location', location);
  if (company_id) query = query.eq('company_id', company_id);
  if (searchQuery) query = query.ilike('title', `%${searchQuery}%`);

  const { data, error } = await query;
  console.log("Supabase response:", { data, error });

  if (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }

  return data;
}


// Function to save or unsave a job
export async function savedJobs(token, { alreadySaved }, saveData ) {
  
  const supabase = await supabaseClient(token);

  if(alreadySaved) {
      const { data, error } = await supabase
      .from('saved_jobs')
      .delete()
      .eq("job_id", saveData.job_id);
      
      if (error) {
        console.error("Error deleting job:", error);
        return null;
      }

      return data;

  } else {
    const { data, error } = await supabase
      .from('saved_jobs')
      .insert(saveData)
      .select();

      if (error) {
        console.error("Error inserting job:", error);
        return null;
      }

      return data;


  }

}

// export async function savedJob(token, { alreadySaved }, saveData) {

//   const supabase = supabaseClient(token);

//   if (alreadySaved) {
//       const { data, error } = await supabase
//       .from('saved_jobs')
//       .delete()
//       .eq('job_id', saveData.job_id);

//     if (deleteError) {
//     console.error("Error deleting saved jobs:", deleteError);
//     return null;
//   }

//     return data;

//   }else {
//       const { data, error: insertError } = await supabase
//         .from('saved_jobs')
//         .insert([saveData]);
//         .select();

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