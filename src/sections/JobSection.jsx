import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import useFetch from "@/hooks/useFetch.jsx";
import { getJobs } from "../api/api-jobs.js";
import { UserAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import JobCard from "../components/JobCard.jsx";
import { SkeletonJobCard } from "../components/SkeletonLoader.jsx";

// JobSection displays all available jobs with search, filter, and advanced UI
export default function JobSection() {
  const { session } = UserAuth();
  const token = session?.access_token;

  // State for search and filter inputs
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [companyId, setCompanyId] = useState("");

  // Fetch jobs with applied filters
  const {
    fn: fnJobs,
    data: dataJobs,
    loading: loadingJobs,
  } = useFetch(
    (token, _, params) => getJobs(token, params),
    {
      searchQuery,
      location,
      company_id: companyId,
    }
  );

  // Fetch jobs whenever token or filters change
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
    return (
      <section>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center text-center pt-24">
          <p className="text-xl text-slate-300">Please sign in to view job listings.</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <Navbar />

      <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
        {/* Hero section with title and description */}
        <div className="max-w-6xl mx-auto mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            Discover Your Next<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"> Opportunity</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8">Find the perfect role tailored for software engineers</p>

          {/* Search bar with location filter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Job Title Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search jobs by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* Location Filter */}
            <div>
              <input
                type="text"
                placeholder="Filter by location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={() => {
                setSearchQuery("");
                setLocation("");
                setCompanyId("");
              }}
              className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-medium"
            >
              Clear Filters
            </button>
          </div>

          {/* Results count */}
          <p className="text-slate-300 text-sm mb-8">
            Found <span className="text-cyan-400 font-semibold">{dataJobs?.length || 0}</span> jobs
            {searchQuery && ` matching "${searchQuery}"`}
            {location && ` in "${location}"`}
          </p>
        </div>

        {/* Jobs grid - displays job cards or skeleton loaders */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingJobs ? (
              // Show skeleton loaders while fetching data
              Array(6)
                .fill(0)
                .map((_, i) => <SkeletonJobCard key={i} />)
            ) : dataJobs?.length ? (
              // Display job cards when data is available
              dataJobs.map((job) => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  savedInit={job.saved?.some((item) => item.user_id === session?.user?.id)}
                  appliedInit={job.applications?.some((application) => application.user_id === session?.user?.id)}
                  onJobSaved={() => fnJobs(token, { searchQuery, location, company_id: companyId })}
                />
              ))
            ) : (
              // Show empty state when no jobs found
              <div className="col-span-full text-center py-12">
                <p className="text-slate-300 text-lg">No jobs found matching your criteria.</p>
                <p className="text-slate-400 text-sm mt-2">Try adjusting your search filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

