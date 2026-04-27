import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserAuth } from '@/context/AuthContext';
import useFetch from '@/hooks/useFetch.jsx';
import { getSingleJob } from '../api/api-jobs.js';
import Navbar from '@/components/Navbar';
import { ApplyJobModal } from '@/components/ApplyJob';
import { ArrowLeft, Briefcase, MapPin, DollarSign, Clock } from 'lucide-react';

export default function SingleJob() {
  const { session } = UserAuth();
  const token = session?.access_token;
  const { job_id } = useParams();
  const navigate = useNavigate();
  const [showApplyModal, setShowApplyModal] = useState(false);

  // Fetch single job data from API
  const {
    fn: fnJob,
    data: job,
    loading: loadingJob,
  } = useFetch((token, _, params) => getSingleJob(token, params));

  // Load job details when job_id changes
  useEffect(() => {
    if (job_id && token) {
      fnJob(token, { job_id });
    }
  }, [job_id, token]); // Removed fnJob from dependencies

  // Check if user has already applied to this job
  const hasApplied = job?.applications?.some(
    (app) => app.candidate_id === session?.user?.id || app.user_id === session?.user?.id
  );

  // Show sign in prompt if user not authenticated
  if (!token) {
    return (
      <section>
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-24 pt-24 min-h-screen">
          <div className="text-center">
            <p className="text-xl text-slate-300 mb-6">Please sign in to view job details.</p>
            <button
              onClick={() => navigate('/signin')}
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Show loading skeleton while fetching data
  if (loadingJob) {
    return (
      <section>
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-24 pt-24 min-h-screen">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-700 rounded w-3/4"></div>
            <div className="h-4 bg-slate-700 rounded w-1/2"></div>
            <div className="h-64 bg-slate-700 rounded mt-8"></div>
          </div>
        </div>
      </section>
    );
  }

  // Show error if job not found
  if (!job) {
    return (
      <section>
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-24 pt-24 min-h-screen">
          <div className="text-center">
            <p className="text-xl text-slate-300 mb-6">Job details not found.</p>
            <button
              onClick={() => navigate('/jobs')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all"
            >
              <ArrowLeft size={20} />
              Back to Job Listings
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-24 pt-24 pb-12">
        {/* Back Button */}
        <button
          onClick={() => navigate('/jobs')}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 rounded-lg transition-all font-medium"
        >
          <ArrowLeft size={18} />
          Back to Job Listings
        </button>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Header Section */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-8">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-2">{job.title}</h1>
                {job.company && (
                  <p className="text-xl text-slate-400 font-semibold">{job.company.name}</p>
                )}
              </div>
            </div>

            {/* Quick Info Badges */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              {job.location && (
                <div className="flex items-center gap-3 py-3 px-4 bg-slate-700/50 rounded-lg border border-slate-600">
                  <MapPin size={20} className="text-purple-400" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase">Location</p>
                    <p className="text-slate-200 font-semibold">{job.location}</p>
                  </div>
                </div>
              )}
              {job.job_type && (
                <div className="flex items-center gap-3 py-3 px-4 bg-slate-700/50 rounded-lg border border-slate-600">
                  <Briefcase size={20} className="text-blue-400" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase">Type</p>
                    <p className="text-slate-200 font-semibold">{job.job_type}</p>
                  </div>
                </div>
              )}
              {job.salaryRange && (
                <div className="flex items-center gap-3 py-3 px-4 bg-slate-700/50 rounded-lg border border-slate-600">
                  <DollarSign size={20} className="text-emerald-400" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase">Salary</p>
                    <p className="text-slate-200 font-semibold">{job.salaryRange}</p>
                  </div>
                </div>
              )}
              {job.experience && (
                <div className="flex items-center gap-3 py-3 px-4 bg-slate-700/50 rounded-lg border border-slate-600">
                  <Clock size={20} className="text-orange-400" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase">Experience</p>
                    <p className="text-slate-200 font-semibold">{job.experience}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Job Description Section */}
          {job.description && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Job Description</h2>
              <div className="h-px bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 mb-6"></div>
              <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                {job.description}
              </p>
            </div>
          )}

          {/* Responsibilities Section */}
          {job.responsibilities && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Responsibilities</h2>
              <div className="h-px bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 mb-6"></div>
              <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                {job.responsibilities}
              </p>
            </div>
          )}

          {/* Requirements/Qualifications Section */}
          {job.requirements && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Requirements & Qualifications</h2>
              <div className="h-px bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 mb-6"></div>
              <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                {job.requirements}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              onClick={() => navigate('/jobs')}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all border border-slate-600 hover:border-slate-500"
            >
              <ArrowLeft size={20} />
              Back to Job Listings
            </button>
            <button
              onClick={() => setShowApplyModal(true)}
              disabled={hasApplied}
              className={`flex-1 px-6 py-4 font-bold rounded-lg transition-all shadow-lg ${
                hasApplied
                  ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-500/20'
              }`}
            >
              {hasApplied ? 'Already Applied' : 'Apply Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Apply Job Modal */}
      <ApplyJobModal
        user={session?.user}
        token={token}
        job={job}
        fetchJob={() => fnJob(token, { job_id })}
        applied={hasApplied}
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
      />
    </section>
  );
}
