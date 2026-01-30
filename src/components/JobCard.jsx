import { MapPin, MapPinIcon, Trash2Icon, Bookmark } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from 'react-router-dom'
import useFetch from '@/hooks/useFetch.jsx';
import { savedJobs } from "../api/api-jobs.js";
import { UserAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";


const JobCard = ({ 
    
    job,
    isMyJob = false,
    saveInit = false,
    onJobSaved = () => {},
 }) => { 
    const [ saved, setSaved ] = useState(saveInit);

    const {
    fn: fnSavedJob,
    data: savedJob,
    loading: loadingSaveJob,
    } = useFetch(savedJobs);

  const { session } = UserAuth();

  const handleSavedJob = async () => {
    await fnSavedJob({
        user_id: session.user.id,
        job_id: job.id,
    });
    onJobSaved();
  };

  useEffect(() => {
    if (savedJob !== undefined) {
        setSaved(!savedJob?.length > 0);
    }
  }, [savedJob]);

  const handleSaveJob = async () => {
    await fnSavedJob({
        user_id: session.user.id,
        job_id: job.id,
    })
    onJobSaved();
  }



    return <Card>
            <CardHeader>
                <CardTitle className='flex justify-between font-bold'>
                    {job.title}

                {!isMyJob && 
                    <Trash2Icon 
                    fill="red" 
                    size={18} 
                    className="text-red-300 cursor-pointer" /> }    
                </CardTitle>
            </CardHeader>

            <CardContent className="flex-col gap-4 flex-1">
                <div>
                    {job.cpmpany && <h3 className="font-medium">{job.company.name}</h3>}
                </div>
                <div>
                    <MapPinIcon size={16}/> {job.location}
                </div>
                < hr/>
                <div className="mt-2">
                    {job.description.substring(0, job.description.indexOf("."))}
                </div>
            </CardContent>
            <CardFooter>
                <Link to={`/jpb/${job.id}`} className="flex">
                    <Button variant="secondary" className="w-full">
                        View Details
                    </Button>
                </Link>
                
                {!isMyJob && (
                <Button 
                variant="w-15" 
                onClick={handleSaveJob} 
                disabled={loadingSaveJob}>
                </Button>
             )}

             {!isMyJob && (
                <Button 
                variant="outline"
                className="w-15" 
                onClick={handleSavedJob} 
                disabled={loadingSaveJob}>

                {saved ? (
                    <Bookmark size={20} stroke="red" fill="red" />
                ) : (
                    <Bookmark size={20} />
                )}

                </Button> 
            )}
            </CardFooter>
            <link></
            link>

           
    </Card>

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