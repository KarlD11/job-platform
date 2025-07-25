import { House,
    User,
    Briefcase,
    SquareDashedKanban } from 'lucide-react';

const navItems = [
    { name: "Home", href: "#home", icon: House },
    { name: "Profile", href: "#profile", icon: User },
    { name: "Jobs", href: "#jobs", icon: Briefcase },
    { name: "Applied", href: "#applied", icon: SquareDashedKanban },
];

export const Navbar = () => {
    return (
        
        <nav className="fixed w-full top-0 z-60 bg-gray-900 text-white shadow-lg transition-all duration-300 ease-in-out">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                
                <a className="text-xl font-bold" href="#home">
                    code<span className="text-blue-400">Connect.</span>
                </a>

                
                <div className="hidden md:flex items-center space-x-8">
                    {navItems.map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            className="flex items-center gap-2 text-lg hover:text-blue-400 transition-colors duration-200 font-medium"
                        >
                            <item.icon className='h-5 w-5' /> 
                            <span>{item.name}</span>
                        </a>
                    ))}
                </div>
                <div className="md:hidden">
                </div>
            </div>
        </nav>
    );
};