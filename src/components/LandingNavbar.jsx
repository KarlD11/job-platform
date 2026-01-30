import { House, User, Briefcase, SquareDashedKanban, Network, BookUser } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";

import { Link } from 'react-router-dom';

const navItems = [
    { name: "For Jobseekers", href: "/", icon: BookUser, id: '#profile' },
    { name: "For Employers", href: "/", icon: Network, id: '#jobs' },
];


export default function Navbar() {
        const [hasItScrolled, setHasItScrolled] = useState(false);
    
           useEffect(() => {
            const handleHasItScrolled = () => {
                setHasItScrolled(window.scrollY > 50);
            }
            window.addEventListener("scroll", handleHasItScrolled);
            return () => window.removeEventListener("scroll", handleHasItScrolled);
        }, []);


    return (
        <nav className={`fixed w-full top-0 z-50 text-white transition-all duration-300 ease-in-out
        ${hasItScrolled 
      ? "py-3 bg-black backdrop-blur-md shadow-xs" 
      : "py-5 shadow-lg"
    }`}
>
            <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <a className="text-xl font-bold" href="/">
                    code<span className="text-blue-400">Connect.</span>
                </a>
                
                <div className="hidden md:flex items-center space-x-8 mr-25">
                    {navItems.map((items) => (
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
                </div>
            </div>
        </nav>
    );
}