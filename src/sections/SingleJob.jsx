import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserAuth } from '@/context/AuthContext';
import useFetch from '@/hooks/useFetch.jsx';
import { getSingleJob } from '../api/api-jobs.js';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import ApplyJobDrawer from '@/components/ApplyJobDrawer';

export default function SingleJob() {
  const { session } = UserAuth();
  const token = session?.access_token;
  const { job_id } = useParams(); // Assuming the route is /single-job/:job_id
  const navigate = useNavigate();

  const {
    fn: fnJob,
    data: job,
    loading: loadingJob,
  } = useFetch((token, _, params) => getSingleJob(token, params));

  useEffect(() => {
    if (job_id) {
      fnJob({ job_id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job_id]);

  if (!token) {
    return (
      <section>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center text-center">
          <p>Please sign in to view job details.</p>
          <Button onClick={() => navigate('/signin')}>Sign In</Button>
        </div>
      </section>
    );
  }

  if (loadingJob) {
    return (
      <section>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center text-center">
          <p>Loading job details...</p>
        </div>
      </section>
    );
  }

  if (!job) {
    return (
      <section>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center text-center">
          <p>Job not found.</p>
          <Button onClick={() => navigate('/jobs')}>Back to Jobs</Button>
        </div>
      </section>
    );
  }

  return (
    <section>
      <Navbar />
      <div className="max-w-5xl mx-auto p-4 pt-24">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
          <h1 className="text-4xl font-bold">{job.title}</h1>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => navigate('/jobs')}>
              Back to Jobs
            </Button>
            <ApplyJobDrawer job={job}>
              <Button>Apply</Button>
            </ApplyJobDrawer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border">
          <div className="mb-4">
            <strong>Company:</strong> {job.company?.name || 'N/A'}
          </div>
          <div className="mb-4">
            <strong>Location:</strong> {job.location || 'Remote'}
          </div>
          <div className="mb-4">
            <strong>Experience:</strong> {job.experience || 'Not specified'}
          </div>
          <div className="mb-4">
            <strong>Employment Type:</strong> {job.job_type || 'Full-time'}
          </div>
          <div className="mb-4">
            <strong>Description:</strong>
          </div>
          <p className="whitespace-pre-line text-gray-700 mb-4">
            {job.description || 'No description available.'}
          </p>
          <div className="mb-4">
            <strong>Responsibilities:</strong>
          </div>
          <p className="whitespace-pre-line text-gray-700 mb-4">
            {job.responsibilities || 'No details yet.'}
          </p>
          <div className="mb-4">
            <strong>Qualifications:</strong>
          </div>
          <p className="whitespace-pre-line text-gray-700">
            {job.requirements || 'No details yet.'}
          </p>
        </div>
      </div>
    </section>
  );
}
