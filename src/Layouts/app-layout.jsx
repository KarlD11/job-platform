import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; 

export default function AppLayout() {
    return (
        <div>
        <div className='min-h-screen miin-w-screen bg-slate-800'>
            <main className='mx-auto'>
                {/* <Navbar /> */}
                <Outlet />
            
            <div className='p-6 text-center bg-gray-700'>
                Created By Karl.Codes.
            </div>
            
            </main>
            
        </div>
        </div>
    );
}
