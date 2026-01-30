import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch.jsx";
import { getJobs } from "../api/api-jobs.js";
import { UserAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import JobCard from "../components/JobCard.jsx";

export default function JobSection() {
  const { session } = UserAuth();
  const token = session?.access_token;

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [companyId, setCompanyId] = useState("");

  const {
    fn: fnJobs,
    data: dataJobs,
    loading: loadingJobs,
  } = useFetch(
    (token, params) => getJobs(token, params),
    {
      searchQuery,
      location,
      company_id: companyId,
    }
  );

  useEffect(() => {
    if (token) {
      fnJobs(token, {
        searchQuery,
        location,
        company_id: companyId,
      });
    }
  }, [token, location, companyId, searchQuery]);

  if (!token) {
    return <div>Please sign in to view job listings.</div>;
  }

  return (
    <section>
      <Navbar />

      <div className="min-h-screen font-inter pt-24">
        <h3 className="text-center text-6xl pt-30 sm:text-7xl pb-8">
          Latest Jobs
        </h3>
      </div>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cold-3 gap-4">
        {loadingJobs ? (
          <div>Loading...</div>
        ) : dataJobs?.length ? (
          dataJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <div>No Jobs</div>
        )}
      </div>
    </section>
  );
}
