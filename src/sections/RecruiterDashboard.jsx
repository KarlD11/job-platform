import { Building2, Plus, Users, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserAuth } from '@/context/AuthContext';

// RecruiterDashboard is the home screen for logged-in recruiters
export default function RecruiterDashboard() {
  const { session, signOut } = UserAuth();
  const name = session?.user?.user_metadata?.fullname ?? 'Recruiter';

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top Bar */}
      <header className="fixed top-0 w-full z-50 bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-xl font-bold">
          code<span className="text-emerald-400">Connect.</span>
          <span className="ml-2 text-xs font-semibold text-slate-400 uppercase tracking-widest">Recruiter</span>
        </a>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-sm">Hi, {name}</span>
          <button
            onClick={signOut}
            className="text-sm text-red-400 hover:text-red-300 font-semibold transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-6 max-w-5xl mx-auto pb-16">
        <div className="mb-10">
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold uppercase tracking-[0.2em] px-4 py-2 mb-4">
            Recruiter Dashboard
          </p>
          <h1 className="text-4xl font-black">Welcome back, {name.split(' ')[0]}.</h1>
          <p className="text-slate-400 mt-2">Manage your job postings and review candidates from here.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 sm:grid-cols-3 mb-12">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/10 p-2 rounded-xl">
                <Plus className="h-6 w-6 text-emerald-400" />
              </div>
              <h2 className="font-bold text-lg">Post a Job</h2>
            </div>
            <p className="text-slate-400 text-sm leading-6">Create a new job listing and start receiving applications.</p>
            <Link
              to="/post-job"
              className="mt-auto inline-block text-center bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Post Job
            </Link>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/10 p-2 rounded-xl">
                <Briefcase className="h-6 w-6 text-blue-400" />
              </div>
              <h2 className="font-bold text-lg">My Jobs</h2>
            </div>
            <p className="text-slate-400 text-sm leading-6">View and manage all the job roles you have posted.</p>
            <Link
              to="/my-jobs"
              className="mt-auto inline-block text-center bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              View Jobs
            </Link>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-500/10 p-2 rounded-xl">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <h2 className="font-bold text-lg">Candidates</h2>
            </div>
            <p className="text-slate-400 text-sm leading-6">Browse all applicants who have applied to your listings.</p>
            <Link
              to="/applications"
              className="mt-auto inline-block text-center bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              View Candidates
            </Link>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col items-center text-center gap-4">
          <Building2 className="h-12 w-12 text-slate-600" />
          <p className="text-slate-500 text-sm max-w-sm">
            More recruiter features are coming soon — applicant tracking, messaging, and candidate shortlisting.
          </p>
        </div>
      </main>
    </div>
  );
}
