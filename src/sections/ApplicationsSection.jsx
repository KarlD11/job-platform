import { useEffect } from 'react';
import { UserAuth } from '@/context/AuthContext';
import useFetch from '@/hooks/useFetch.jsx';
import { getApplications, testDatabaseConnection } from '../api/api-applications';
import Navbar from '@/components/Navbar';
import { SkeletonJobCard } from '@/components/SkeletonLoader.jsx';

// ApplicationsSection displays user's job applications with modern dark theme
export default function ApplicationsSection() {
  const { session, loading: authLoading } = UserAuth();
  const token = session?.access_token;

  console.log('🔐 ApplicationsSection Auth State:', {
    session_exists: !!session,
    user_exists: !!session?.user,
    user_id: session?.user?.id,
    token_exists: !!token,
    auth_loading: authLoading,
    full_session: session
  });

  // Fetch all applications submitted by current user
  const {
    fn: fnGetApplications,
    data: applications,
    loading: loadingApplications,
  } = useFetch((token, _, params) => getApplications(token, params));

  // Load applications when component mounts
  useEffect(() => {
    if (token && session?.user?.id && !authLoading) {
      console.log('🚀 ApplicationsSection: Starting to fetch applications');
      console.log('👤 User session details:', {
        user_id: session.user.id,
        email: session.user.email,
        token_present: !!token,
        auth_loading: authLoading
      });

      // Test database connection first
      testDatabaseConnection(token).then(result => {
        if (result.success) {
          console.log('🗄️ Database test passed, proceeding with applications fetch');
          fnGetApplications(token, { user_id: session.user.id });
        } else {
          console.error('🗄️ Database test failed:', result.error);
        }
      });
    } else {
      console.log('⚠️ ApplicationsSection: Waiting for authentication', {
        has_token: !!token,
        has_user: !!session?.user,
        user_id: session?.user?.id,
        auth_loading: authLoading
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, session?.user?.id, authLoading]);

  // Debug: Log applications data
  useEffect(() => {
    console.log('Applications data:', applications);
  }, [applications]);

  if (!token) {
    return (
      <section>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center text-center pt-24">
          <p className="text-xl text-slate-300">Please sign in to view your applications.</p>
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
          My<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> Applications</span>
        </h1>
        <p className="text-slate-300 mb-12">Track the status of all your job applications</p>

        {/* Applications grid - skeleton or content */}
        {loadingApplications ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill(0)
              .map((_, i) => <SkeletonJobCard key={i} />)}
          </div>
        ) : applications?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((application) => (
              <div
                key={application.id}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-lg p-6 border border-slate-700 hover:border-purple-500/50 transition-all duration-300"
              >
                {/* Job title */}
                <h3 className="text-xl font-semibold text-white mb-2">{application.job?.title}</h3>
                
                {/* Company name */}
                <p className="text-purple-300 font-medium mb-2">{application.job?.company?.name}</p>
                
                {/* Application date */}
                <p className="text-sm text-slate-400 mb-2">
                  Applied on{' '}
                  <span className="text-cyan-400">
                    {new Date(application.created_at).toLocaleDateString()}
                  </span>
                </p>

                {/* Resume link */}
                {application.resume && (
                  <div className="mb-4">
                    <p className="text-sm text-slate-400 mb-2">
                      <a 
                        href={application.resume} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 underline"
                        onClick={() => console.log('🔗 Accessing resume URL:', application.resume)}
                      >
                        View Resume
                      </a>
                    </p>
                    <button
                      onClick={async () => {
                        try {
                          console.log('🧪 Testing resume accessibility...');
                          const response = await fetch(application.resume, { method: 'HEAD' });
                          if (response.ok) {
                            console.log('✅ Resume file is accessible:', response.status);
                            alert('Resume file is accessible!');
                          } else {
                            console.log('❌ Resume file not accessible:', response.status);
                            alert(`Resume file not accessible (Status: ${response.status})`);
                          }
                        } catch (error) {
                          console.error('❌ Error testing resume accessibility:', error);
                          alert('Error testing resume accessibility');
                        }
                      }}
                      className="text-xs px-2 py-1 bg-slate-600 hover:bg-slate-500 text-slate-300 rounded transition-colors"
                    >
                      Test File Access
                    </button>
                  </div>
                )}

                {/* Status badge */}
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      application.status === 'pending' || application.status === 'applied'
                        ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                        : application.status === 'reviewing' || application.status === 'being reviewed'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : application.status === 'accepted' || application.status === 'passed'
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : application.status === 'rejected'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                        : 'bg-slate-600 text-slate-300 border border-slate-500/30'
                    }`}
                  >
                    {application.status === 'applied' ? 'Pending Review' :
                     application.status === 'reviewing' ? 'Under Review' :
                     application.status === 'being reviewed' ? 'Under Review' :
                     application.status === 'passed' ? 'Accepted' :
                     application.status === 'accepted' ? 'Accepted' :
                     application.status === 'rejected' ? 'Rejected' :
                     application.status || 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-300 text-lg">You haven't applied to any jobs yet.</p>
            <p className="text-slate-400 text-sm mt-2">
              <a href="/jobs" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                Browse jobs
              </a>
              {' '}and start applying today.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
