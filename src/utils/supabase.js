import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export { supabaseUrl };

export const supabaseClient = (accessToken) => {
  if (!accessToken) {
    throw new Error('No access token provided to supabaseClient');
  }


  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
};

// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// const supabaseClient = async (supabaseAccessToken) => {
//     const supabase = createClient(supabaseUrl, supabaseKey,  {
//         global: { 
//             headers: {
//                 Authorization: `Bearer ${supabaseAccessToken}`,
//             },
//         },
// });
// return supabase;
// };

// export default supabaseClient;
        