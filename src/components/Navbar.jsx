import { House, User, Briefcase, SquareDashedKanban, Bookmark, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { UserAuth } from '@/context/AuthContext';

const defaultNavItems = [
    { name: "Home", href: "/jobs", icon: House, id: "#home" },
    { name: "Jobs", href: "/jobs", icon: Briefcase, id: '#jobs' },
    { name: "Saved", href: "/saved-job", icon: Bookmark, id: '#saved' },
    { name: "Applications", href: "/applications", icon: FileText, id: '#applications' },
    { name: "Profile", href: "/profile", icon: User, id: '#profile' },
];

const signedInNavItems = [
    { name: "Jobs", href: "/jobs", icon: Briefcase, id: '#jobs' },
    { name: "Applications", href: "/applications", icon: FileText, id: '#applications' },
    { name: "Saved Jobs", href: "/saved-job", icon: Bookmark, id: '#saved' },
    { name: "Profile", href: "/profile", icon: User, id: '#profile' },
];

export default function Navbar() {

    const { session, signOut } = UserAuth();

    const [hasItScrolled, setHasItScrolled] = useState(false);

       useEffect(() => {
        const handleHasItScrolled = () => {
            setHasItScrolled(window.scrollY > 50);
        }
        window.addEventListener("scroll", handleHasItScrolled);
        return () => window.removeEventListener("scroll", handleHasItScrolled);
    }, []);
    
    return (
        <nav 
        className={`fixed w-full top-0 z-50 text-white transition-all duration-300 ease-in-out
        ${hasItScrolled 
      ? "py-3 bg-black backdrop-blur-md shadow-xs" 
      : "py-5 shadow-lg"
    }`}
>
            <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link className="text-xl font-bold" to={session?.user ? "/jobs" : "/"}>
                    code<span className="text-blue-400">Connect.</span>
                </Link>
                
                <div className="hidden md:flex items-center space-x-8 mr-25">
                    {(session ? signedInNavItems : defaultNavItems).map((items) => (
                    <Link
                     key={items.name}
                    to={`${items.href}`} 
                    className="flex items-center gap-2 text-lg hover:text-blue-400 transition-colors duration-200 font-medium"
                >
                    <items.icon className='h-5 w-5' /> 
                    <span>{items.name}</span>
                </Link> 
                ))}
                </div>

                <div className="hidden md:flex items-center space-x-8 mr">
                    {!session ? (
                    <>
                      <Button variant="secondary" asChild>
                        <Link to="/signin">
                            Login
                        </Link>
                    </Button>

                     <Button variant="primary">
                    <Link to="/signup">
                        Get Started
                    </Link>
                </Button>
                      </>  ) : (
                    <Button variant="destructive" onClick={signOut}>
                    Logout
                    </Button>
                      )}               
                </div>
            </div>
        </nav>
    );
}