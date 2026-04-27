import { MapPin, Trash2, Bookmark, Briefcase, DollarSign, Clock } from "lucide-react";
import { Link } from 'react-router-dom'
import useFetch from '@/hooks/useFetch.jsx';
import { savedJobs } from "../api/api-jobs.js";
import { UserAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { ApplyJobModal } from './ApplyJob';

// JobCard displays individual job opportunities with modern tech-focused design
// Includes job title, company, location, and save/apply functionality
const JobCard = ({ 
    job,
    isMyJob = false,
    savedInit = false,
    onJobSaved = () => {},
 }) => { 
    // State management for saved job status and application status
    const [ saved, setSaved ] = useState(savedInit);
    const [ showApplyModal, setShowApplyModal ] = useState(false);
    const [ hasApplied, setHasApplied ] = useState(false);
    const { session } = UserAuth();

    // Custom hook for API calls to save/unsave jobs
    const {
    fn: fnSavedJob,
    loading: loadingSaveJob,
    } = useFetch((token, _, saveRequest) => savedJobs(token, saveRequest));

  // Toggle save state for job bookmarking functionality
  const handleToggleSave = async () => {
    await fnSavedJob(session?.access_token, {
      alreadySaved: saved,
      user_id: session.user.id,
      job_id: job.id,
    });
    setSaved(!saved);
    onJobSaved();
  };

  // Update saved state when initial prop changes
  useEffect(() => {
    setSaved(savedInit);
  }, [savedInit]);

    return (
      // Outer container with dark gradient background and modern styling
      <div className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col">
        
        {/* Header section with color-coded accent bar */}
        <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>

        {/* Card content wrapper */}
        <div className="p-6 flex flex-col flex-1">
          
          {/* Top section: Job title and delete button */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1 pr-4">
              {/* Job title with gradient text */}
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-1 group-hover:from-cyan-300 group-hover:to-blue-300 transition-all">
                {job.title}
              </h2>
              {/* Company name in slate */}
              {job.company && <p className="text-sm text-slate-300 font-medium">{job.company.name}</p>}
            </div>

            {/* Delete button for user's own jobs */}
            {isMyJob && (
              <button className="text-slate-400 hover:text-red-400 transition-colors">
                <Trash2 size={18} />
              </button>
            )}
          </div>

          {/* Location section with icon */}
          <div className="flex items-center gap-2 mb-3 text-slate-300">
            <MapPin size={16} className="text-purple-400" />
            <span className="text-sm">{job.location}</span>
          </div>

          {/* Divider line for visual separation */}
          <div className="h-px bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 mb-4"></div>

          {/* Job description preview */}
          <div className="flex-1 mb-4">
            <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
              {job.description.substring(0, job.description.indexOf(".") > 0 ? job.description.indexOf(".") + 1 : job.description.length)}
            </p>
          </div>

          {/* Metadata badges: Job type, salary range, posted time */}
          <div className="flex flex-wrap gap-2 mb-5">
            {job.jobType && (
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-slate-700/50 border border-slate-600 rounded-full">
                <Briefcase size={14} className="text-blue-400" />
                <span className="text-xs text-slate-300">{job.jobType}</span>
              </div>
            )}
            {job.salaryRange && (
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-slate-700/50 border border-slate-600 rounded-full">
                <DollarSign size={14} className="text-emerald-400" />
                <span className="text-xs text-slate-300">{job.salaryRange}</span>
              </div>
            )}
            {job.postedDaysAgo && (
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-slate-700/50 border border-slate-600 rounded-full">
                <Clock size={14} className="text-orange-400" />
                <span className="text-xs text-slate-300">{job.postedDaysAgo}d ago</span>
              </div>
            )}
          </div>

          {/* Action buttons section */}
          <div className="flex gap-2">
            {/* View Details Button - Routes to full job details page */}
            <Link to={`/job/${job.id}`} className="flex-1">
              <button className="w-full px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300 text-sm">
                View Details
              </button>
            </Link>

            {/* Apply Button - Submit application for job */}
            <button 
              onClick={() => setShowApplyModal(true)}
              disabled={hasApplied}
              className={`px-4 py-2.5 border rounded-lg transition-all duration-300 text-sm font-semibold ${
                hasApplied 
                  ? 'bg-green-600/20 border-green-500/30 text-green-300 cursor-not-allowed' 
                  : 'bg-slate-700 hover:bg-slate-600 border-slate-600 hover:border-purple-500/50 text-slate-200'
              }`}
            >
              {hasApplied ? 'Applied' : 'Apply'}
            </button>

            {/* Save Job Button - Bookmark job for later reference */}
            {!isMyJob && (
              <button 
                onClick={handleToggleSave} 
                disabled={loadingSaveJob}
                className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 border border-slate-600 hover:border-purple-500/50 text-slate-200 rounded-lg transition-all duration-300 disabled:opacity-50"
              >
                <Bookmark 
                  size={18} 
                  className={saved ? "fill-cyan-400 text-cyan-400" : "text-slate-400"}
                />
              </button>
            )}
          </div>
        </div>

        {/* Apply Job Modal */}
        <ApplyJobModal
          user={session?.user}
          token={session?.access_token}
          job={job}
          fetchJob={() => {
            setHasApplied(true);
            onJobSaved();
          }}
          applied={hasApplied}
          isOpen={showApplyModal}
          onClose={() => setShowApplyModal(false)}
        />
      </div>
    );
}

export default JobCard;

























// const JobCart = ({
// job, isMyJob = false, s
// aveInit = false, 
// onJobSave = ()
// }) => { 


//     const datePosted = dayjs(props.postedOn);
//     const today = dayjs();
//     const diffInDays = today.diff(datePosted, 'days');

//     return (
//         <div className="mb-4">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-6 bg-gradient-to-t from-gray-900 to-gray-600 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out text-white">
//                 {/* Left section: Job details */}
//                 <div className="flex flex-col items-start gap-2 mb-4 md:mb-0">
//                     <h2 className="text-xl font-semibold">{props.title} - {props.companyName}</h2> 
//                     <p className="text-sm text-gray-200">{props.jobType} - {props.experienceLevel} - {props.location}</p>
//                     <div className="mt-2 flex flex-wrap gap-2"> 
//                         {props.skills.map((skill, index) => (
//                             <span 
//                                 key={index} 
//                                 className="inline-block bg-gray-700 text-gray-300 rounded-full px-3 py-1 text-xs font-medium border border-gray-500">
//                                 {skill}
//                             </span>
//                         ))}
//                     </div>
//                 </div>
                
                
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4"> 
//                     <p className="text-gray-400 text-sm">Posted {diffInDays} days ago</p>
//                     <a 
//                         href={props.jobLink} 
//                         target="_blank"     
//                         rel="noopener noreferrer" 
//                     >
//                         <button 
//                             className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 ease-in-out shadow-md hover:shadow-lg" // Improved button styling
//                         >
//                             Apply
//                         </button>
//                     </a> 
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default JobCartSection; 