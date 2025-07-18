import dayjs from "dayjs";








export const JobCartSection = (props) => {

    const Skills = ["Javascript", "Nodejs", "React", "Express"];
    const date1 = dayjs(Date.now());
    const diffInDays = date1.diff(props.postedOn,'days') 

    
    return (
        <div className="px-80 mx-10 mb-4 text-white ml-auto">
            <div className="flex justify-between items-center px-12 py-6 bg-gradient-to-t from-gray-900 to-gray-600 rounded-lg">
                <div className="flex flex-col items-start gap-3">
                    <h1>{props.title} - {props.companyName}</h1>
                    <p>{props.jobType} - {props.experienceLevel} - {props.location}</p>
                    <div className="mt-2">
                        {props.skills.map((skill, index) => (
                            <p key={index} className="inline mr-2 text-gray-500 border rounded-md border-gray-500 py-1 px-1">{skill}</p>
                        ))}
                    </div>
                </div>
                    <div className="flex items-center gap-4"> 
                        <p className="text-gray-500">Posted {diffInDays} days ago</p>
                        <a href={props.jpbLink}>
                            <button className="text-gray-500 border border-blue-400 px-2 py-2">Apply</button>
                        </a> 
                    </div>
            </div>
        </div>
    )
}