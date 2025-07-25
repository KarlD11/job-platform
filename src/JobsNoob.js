

export const JobsData = [ 
    {
        id: 1,
        title: "Frontend Developer",
        companyName: "TechCorp",
        location: "San Francisco, CA",
        jobType: "Full-time",
        experienceLevel: "Mid-level",
        skills: ["React", "JavaScript", "CSS", "HTML"],
        postedOn: "2025-07-20", 
        jobLink: "https://example.com/apply"
    },
    {
        id: 2,
        title: "Backend Engineer",
        companyName: "DataSoft",
        location: "New York, NY",
        jobType: "Full-time",
        experienceLevel: "Senior",
        skills: ["Node.js", "Python", "MongoDB", "AWS"],
        postedOn: "2025-07-15",
        jobLink: "https://example.com/apply"
    },
    {
        id: 3,
        title: "Full Stack Developer",
        companyName: "StartupXYZ",
        location: "Remote",
        jobType: "Contract",
        experienceLevel: "Mid-level",
        skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
        postedOn: "2025-07-19",
        jobLink: "https://example.com/apply"
    },
    {
        id: 4,
        title: "UI/UX Designer",
        companyName: "DesignHub",
        location: "Austin, TX",
        jobType: "Part-time",
        experienceLevel: "Entry-level",
        skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
        postedOn: "2025-07-17",
        jobLink: "https://example.com/apply"
    },
    {
        id: 5,
        title: "DevOps Engineer",
        companyName: "CloudTech",
        location: "Seattle, WA",
        jobType: "Full-time",
        experienceLevel: "Senior",
        skills: ["Docker", "Kubernetes", "Jenkins", "AWS"],
        postedOn: "2025-07-21",
        jobLink: "https://example.com/apply"
    },
    {
        id: 6,
        title: "Mobile Developer",
        companyName: "AppStudio",
        location: "Los Angeles, CA",
        jobType: "Full-time",
        experienceLevel: "Mid-level",
        skills: ["React Native", "Swift", "Kotlin", "Firebase"],
        postedOn: "2025-07-18",
        jobLink: "https://example.com/apply"
    }
];


export const searchJobs = (jobs, query, location) => { 
    if (!query && !location) return jobs;
    
    return jobs.filter(job => {
        const matchesQuery = !query || 
            job.title.toLowerCase().includes(query.toLowerCase()) ||
            job.companyName.toLowerCase().includes(query.toLowerCase()) ||
            job.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase())) ||
            job.experienceLevel.toLowerCase().includes(query.toLowerCase()) ||
            job.jobType.toLowerCase().includes(query.toLowerCase());
        
        const matchesLocation = !location || 
            job.location.toLowerCase().includes(location.toLowerCase());
        
        return matchesQuery && matchesLocation;
    });
};