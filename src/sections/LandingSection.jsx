import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LandingNavbar from '../components/LandingNavbar';



export default function LandingSection() {
    return (
        <section className="flex flex-col items-center justify-center py-50">
            {/* Navbar for Landing Page */}
            <LandingNavbar />
            {/*  */}
            <div>
                <h1 className="flex font-solid font-bold text-7xl p-5 bg-gray-700 rounded-lg text-white">
                    Get Paid To Code?</h1>
                     <span className="flex items-center justify-center text-3xl font-bold text-white mt-10" href="#home">
                    code<span className="text-blue-400">Connect.</span>
                    </span>
            </div>

            <div className='flex items-center gap-10'>
                <Link 
                    to="/jobs" 
                    className="inline-block mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    View Jobs
                </Link>
               

                <Link 
                    to="/post-job" 
                    className="inline-block mt-6 ml-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-lg"
                >
                    Post a Job
                </Link> 
            </div>
            <div className='text-center mt-6 '>
                <p className='italic'>Trusted by many, used by thoursdands worldwide</p>
            </div>
            
        </section>
    )
}