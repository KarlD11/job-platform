
import dayjs from 'dayjs'; 

const JobCartSection = (props) => { 


    const datePosted = dayjs(props.postedOn);
    const today = dayjs();
    const diffInDays = today.diff(datePosted, 'days');

    return (
        <div className="mb-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-6 bg-gradient-to-t from-gray-900 to-gray-600 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out text-white">
                {/* Left section: Job details */}
                <div className="flex flex-col items-start gap-2 mb-4 md:mb-0">
                    <h2 className="text-xl font-semibold">{props.title} - {props.companyName}</h2> 
                    <p className="text-sm text-gray-200">{props.jobType} - {props.experienceLevel} - {props.location}</p>
                    <div className="mt-2 flex flex-wrap gap-2"> 
                        {props.skills.map((skill, index) => (
                            <span 
                                key={index} 
                                className="inline-block bg-gray-700 text-gray-300 rounded-full px-3 py-1 text-xs font-medium border border-gray-500">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
                
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4"> 
                    <p className="text-gray-400 text-sm">Posted {diffInDays} days ago</p>
                    <a 
                        href={props.jobLink} 
                        target="_blank"     
                        rel="noopener noreferrer" 
                    >
                        <button 
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 ease-in-out shadow-md hover:shadow-lg" // Improved button styling
                        >
                            Apply
                        </button>
                    </a> 
                </div>
            </div>
        </div>
    );
};

export default JobCartSection; 