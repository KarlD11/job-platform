import { useState } from 'react';
import { JobsData, searchJobs } from '../JobsNoob'; 
import JobCartSection from './JobCartSection';   

export default function HeroSection() { 
    const [jobQuery, setJobQuery] = useState('');
    const [location, setLocation] = useState('');
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);

  
    const handleSearch = () => {
        if (!jobQuery.trim() && !location.trim()) {
            alert('Please enter a job title, skill, or location to search'); 
            return; 
        }

       
        const results = searchJobs(JobsData, jobQuery.trim(), location.trim());
        setFilteredJobs(results); 
        setSearchPerformed(true); 
    };

   
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(); 
        }
    };

  
    const resetSearch = () => {
        setJobQuery(''); 
        setLocation(''); 
        setFilteredJobs([]); 
        setSearchPerformed(false); 
    };

    return (
        <div className="min-h-screen bg-gray-50 font-inter pt-24"> 
            <div className="container flex items-center 2xl:px-20 mx-auto my-10">
                <div className="border outline-none px-18 py-12 bg-gradient-to-r from-slate-900 to-slate-700 text-white text-center mx-auto rounded-xl shadow-lg w-full">
                    <h2 className="text-2xl md:text-3xl font-medium mb-4">There's a job waiting to hear from you</h2>
                    <p className="mb-6 max-w-xl mx-auto px-5 font-light text-sm">Start Your Career With Us!</p>
                    <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-md text-gray-600 p-2 mx-4 sm:mx-auto max-w-md shadow-inner">
                        <div className="w-full sm:w-1/2 p-1">
                            <input 
                                type="text"
                                value={jobQuery}
                                onChange={(e) => setJobQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="What's Next For You?" 
                                className="max-sm:text-xs p-2 rounded-md outline-none w-full text-gray-800"
                            />
                        </div>
                        <div className="w-full sm:w-1/2 p-1">
                            <input 
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Location" 
                                className="max-sm:text-xs p-2 rounded-md outline-none w-full text-gray-800"
                            />
                        </div>
                        <button 
                            onClick={handleSearch}
                            className="bg-blue-600 px-6 py-2 rounded-md text-white m-1 hover:bg-blue-700 transition-colors duration-300 ease-in-out shadow-md hover:shadow-lg w-full sm:w-auto"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>


            {searchPerformed ? ( 
                <div className="container mx-auto px-4 pb-8">
                    <div className="mb-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Search Results ({filteredJobs.length})
                                {jobQuery && <span className="text-lg font-normal text-gray-600"> for "{jobQuery}"</span>}
                                {location && <span className="text-lg font-normal text-gray-600"> in "{location}"</span>}
                            </h2>
                            <button 
                                onClick={resetSearch}
                                className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700 transition-colors duration-300 ease-in-out shadow-md"
                            >
                                Clear Search
                            </button>
                        </div>
                        
                        {filteredJobs.length === 0 ? ( // If no jobs match the search
                            <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                                <p className="text-gray-600 mb-4">No jobs found matching your search criteria.</p>
                                <p className="text-sm text-gray-500 mb-4">
                                    Try searching for: "Developer", "React", "Remote", "Designer", or other job titles and skills.
                                </p>
                                <button 
                                    onClick={resetSearch}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 ease-in-out shadow-md"
                                >
                                    Show All Jobs
                                </button>
                            </div>
                        ) : ( 
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> 
                                {filteredJobs.map(job => (
                                    <JobCartSection 
                                        key={job.id} 
                                        title={job.title}
                                        companyName={job.companyName}
                                        location={job.location}
                                        jobType={job.jobType}
                                        experienceLevel={job.experienceLevel}
                                        skills={job.skills}
                                        postedOn={job.postedOn}
                                        jobLink={job.jobLink}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ) : ( 
                <div className="container mx-auto px-4 pb-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">All Available Jobs ({JobsData.length})</h2>
                        <p className="text-gray-600">Use the search above to find specific positions</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> {/* Responsive grid for job cards */}
                        {JobsData.map(job => (
                            <JobCartSection 
                                key={job.id} 
                                title={job.title}
                                companyName={job.companyName}
                                location={job.location}
                                jobType={job.jobType}
                                experienceLevel={job.experienceLevel}
                                skills={job.skills}
                                postedOn={job.postedOn}
                                jobLink={job.jobLink}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}