
import { useEffect } from 'react';
import { UserAuth } from '@/context/AuthContext';
import useFetch from '@/hooks/useFetch.jsx';
import { getSavedJobs } from '../api/api-jobs.js';
import Navbar from '@/components/Navbar';
import JobCard from '@/components/JobCard.jsx';
import { SkeletonJobCard } from '@/components/SkeletonLoader.jsx';

// SaveJobSection displays user's saved/bookmarked jobs with dark theme styling
export default function SaveJobSection() {
  const { session } = UserAuth();
  const token = session?.access_token;

  // Fetch saved jobs for the current user
  const {
    fn: fnGetSavedJobs,
    data: savedJobs,
    loading: loadingSavedJobs,
  } = useFetch((token, params) => getSavedJobs(token, params));

  // Load saved jobs when component mounts or user changes
  useEffect(() => {
    if (token && session?.user?.id) {
      fnGetSavedJobs(token, { user_id: session?.user?.id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, session?.user?.id]);

  if (!token) {
    return (
      <section>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center text-center pt-24">
          <p className="text-xl text-slate-300">Please sign in to view saved jobs.</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4 pt-24">
        {/* Header */}
        <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
          Saved<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"> Jobs</span>
        </h1>
        <p className="text-slate-300 mb-12">Jobs you've bookmarked for later review</p>

        {/* Jobs grid - skeleton or content */}
        {loadingSavedJobs ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill(0)
              .map((_, i) => <SkeletonJobCard key={i} />)}
          </div>
        ) : savedJobs?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                savedInit={true}
                onJobSaved={() => fnGetSavedJobs(token, { user_id: session?.user?.id })}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-300 text-lg">No saved jobs yet.</p>
            <p className="text-slate-400 text-sm mt-2">Bookmark jobs you're interested in to find them here.</p>
          </div>
        )}
      </div>
    </section>
  );
}
