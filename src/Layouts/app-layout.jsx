import { Outlet, Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import { Briefcase, Mail, Github, Linkedin } from 'lucide-react';

export default function AppLayout() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <div className='flex-1'>
                <main className='mx-auto'>
                    {/* <Navbar /> */}
                    <Outlet />
                </main>
            </div>

            {/* Professional Footer */}
            <footer className="mt-[46px] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        
                        {/* Brand Section */}
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg">
                                    <Briefcase className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white">
                                    code<span className="text-cyan-400">Connect</span>
                                </h3>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Connecting talented developers with the best opportunities in technology. Find your next great role today.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Platform</h4>
                            <ul className="space-y-3">
                                <li><Link to="/jobs" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Browse Jobs</Link></li>
                                <li><Link to="/saved-job" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Saved Jobs</Link></li>
                                <li><Link to="/applications" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Applications</Link></li>
                                <li><Link to="/profile" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">My Profile</Link></li>
                            </ul>
                        </div>

                        {/* Developer Info */}
                        <div>
                            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Developer</h4>
                            <ul className="space-y-3">
                                <li><p className="text-slate-400 text-sm">Built by Karl</p></li>
                                <li><a href="https://karl.codes" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm inline-flex items-center gap-1">
                                    karl.codes
                                    <span className="text-xs">↗</span>
                                </a></li>
                                <li><p className="text-slate-400 text-sm">React • Tailwind • Supabase</p></li>
                            </ul>
                        </div>

                        {/* Connect Section */}
                        <div>
                            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Connect</h4>
                            <div className="flex gap-4">
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-slate-800">
                                    <Github className="h-5 w-5" />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-slate-800">
                                    <Linkedin className="h-5 w-5" />
                                </a>
                                <a href="mailto:contact@karl.codes" className="text-slate-400 hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-slate-800">
                                    <Mail className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="border-t border-slate-800 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-slate-500 text-sm text-center md:text-left">
                                © {currentYear} CodeConnect. Crafted with passion for the tech community.
                            </p>
                            <div className="flex gap-6">
                                <a href="#" className="text-slate-500 hover:text-slate-400 text-sm transition-colors">Privacy Policy</a>
                                <a href="#" className="text-slate-500 hover:text-slate-400 text-sm transition-colors">Terms of Service</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative gradient accent */}
                <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
            </footer>
        </div>
    );
}
