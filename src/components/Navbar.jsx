
import { House, 
    User, 
    Briefcase, 
    SquareDashedKanban } from 'lucide-react';




const navItems = [
    { name: "Home", href: "#home", icon: House },
    { name: "Profile", href: "#profile", icon: User },
    { name: "Jobs", href: "#jobs", icon: Briefcase },
    { name: "Applied", href: "#pplied", icon: SquareDashedKanban },
];



export const Navbar = () => {

    return (
        <nav className="fixed w-full z-60 transition-all duration-300 text-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <a className="flex justify-between items-center h-16" href="#home">
                    <span>code
                        <span className="text-glow">Connect.
                        </span>
                    </span>
                </a>

                {/* Desktop Navigation Bar */}
                <div className="hidden md:flex flex-col gap-10 items-start justify-center">
                    {navItems.map((items, index) => (
                        <a key={index} href={items.href} 
                        className="flex flex-col items-center gap-1">
                            <items.icon className='h-5 w-5' />
                            {items.name}
                        </a>
                    ))}
                </div> 

            </div>

        </nav>
    );




};