import { Link } from 'react-router-dom';
import LandingNavbar from '../components/LandingNavbar';
import { UserAuth } from '@/context/AuthContext';



export default function LandingSection() {
    const { session } = UserAuth();
    const jobsLink = session?.user ? "/jobs" : "/signin";

    return (
        <section className="relative overflow-hidden min-h-screen">
            {/* Animated Background Gradient Orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-600/20 to-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/3 -left-32 w-96 h-96 bg-gradient-to-tr from-purple-600/15 to-pink-500/10 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-gradient-to-t from-emerald-600/10 to-teal-500/5 rounded-full blur-3xl opacity-40"></div>
                <div className="absolute bottom-1/4 -left-40 w-80 h-80 bg-gradient-to-r from-blue-600/10 to-slate-600/5 rounded-full blur-3xl opacity-30"></div>
            </div>
            
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
            {/* Navbar for Landing Page */}
            <LandingNavbar />
            
            {/* Hero Section - Minimalist & Modern */}
            <div className="relative min-h-[100vh] flex flex-col items-center justify-center px-8 overflow-hidden pt-40 z-10">
                {/* Gradient Background Elements */}
                <div className="absolute top-10 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/15 to-blue-500/8 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/12 to-pink-500/6 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 text-center max-w-4xl">
                    
                    <h1 className="text-7xl md:text-8xl font-black mb-6 leading-tight">
                        <span className="text-white">Get Paid</span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">To Code</span>
                        <span className="text-white">?</span>
                    </h1>
                    
                    <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                        A niche-focused platform where elite software engineers meet innovative startups and forward-thinking companies. 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300"> Direct connections. No middlemen.</span>
                    </p>
                    
                    <div className='flex items-center gap-6 justify-center flex-wrap'>
                        <Link 
                            to={jobsLink} 
                            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
                        >
                            <span className="relative z-10">Explore Opportunities</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Link>
                        
                        <Link 
                            to="/post-job" 
                            className="px-8 py-4 border-2 border-purple-400 text-purple-300 font-semibold rounded-lg hover:bg-purple-500/10 transition-all duration-300 hover:border-purple-300"
                        >
                            Post a Role
                        </Link> 
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section - Card Grid */}
            <div className="w-full px-8 py-32">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-black text-white mb-4">Why CodeConnect</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* For Engineers */}
                        <div className="group relative p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">For Engineers</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3 text-slate-200">
                                        <span className="text-cyan-400 font-bold text-xl mt-0.5">→</span>
                                        <div>
                                            <strong className="text-white">Niche-Focused</strong>
                                            <p className="text-sm text-slate-400 mt-1">Every role is hand-picked for software engineers. No noise.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3 text-slate-200">
                                        <span className="text-cyan-400 font-bold text-xl mt-0.5">→</span>
                                        <div>
                                            <strong className="text-white">Direct Access</strong>
                                            <p className="text-sm text-slate-400 mt-1">Connect directly with founders and hiring teams.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3 text-slate-200">
                                        <span className="text-cyan-400 font-bold text-xl mt-0.5">→</span>
                                        <div>
                                            <strong className="text-white">Better Opportunities</strong>
                                            <p className="text-sm text-slate-400 mt-1">Competitive salaries at companies building the future.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3 text-slate-200">
                                        <span className="text-cyan-400 font-bold text-xl mt-0.5">→</span>
                                        <div>
                                            <strong className="text-white">Smart Tools</strong>
                                            <p className="text-sm text-slate-400 mt-1">Save jobs, manage applications, track progress.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* For Companies */}
                        <div className="group relative p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">For Companies</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3 text-slate-200">
                                        <span className="text-purple-400 font-bold text-xl mt-0.5">→</span>
                                        <div>
                                            <strong className="text-white">Quality Talent</strong>
                                            <p className="text-sm text-slate-400 mt-1">Access a curated pool of skilled engineers actively seeking roles.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3 text-slate-200">
                                        <span className="text-purple-400 font-bold text-xl mt-0.5">→</span>
                                        <div>
                                            <strong className="text-white">Faster Hiring</strong>
                                            <p className="text-sm text-slate-400 mt-1">From post to hire in days, not weeks. No gatekeepers.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3 text-slate-200">
                                        <span className="text-purple-400 font-bold text-xl mt-0.5">→</span>
                                        <div>
                                            <strong className="text-white">Cost-Effective</strong>
                                            <p className="text-sm text-slate-400 mt-1">No recruitment agency fees. Direct connections only.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3 text-slate-200">
                                        <span className="text-purple-400 font-bold text-xl mt-0.5">→</span>
                                        <div>
                                            <strong className="text-white">Built for Tech</strong>
                                            <p className="text-sm text-slate-400 mt-1">A platform designed by tech teams, for tech teams.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Platform Highlights - Modern Minimalist */}
            <div className="w-full px-8 py-32">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white">Why We're Different</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="relative p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20 group hover:border-cyan-500/50 transition-all duration-300">
                            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-400 mb-4">01</div>
                            <h4 className="text-xl font-bold text-white mb-3">Specialized Ecosystem</h4>
                            <p className="text-slate-400 leading-relaxed">Built exclusively for software engineers and innovative companies. Every feature, every job, designed for technical talent.</p>
                        </div>
                        <div className="relative p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/20 group hover:border-purple-500/50 transition-all duration-300">
                            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-pink-400 mb-4">02</div>
                            <h4 className="text-xl font-bold text-white mb-3">Lightning Speed</h4>
                            <p className="text-slate-400 leading-relaxed">From application to offer in record time. Our streamlined platform keeps pace with the velocity of tech innovation.</p>
                        </div>
                        <div className="relative p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 group hover:border-emerald-500/50 transition-all duration-300">
                            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-teal-400 mb-4">03</div>
                            <h4 className="text-xl font-bold text-white mb-3">Direct Connections</h4>
                            <p className="text-slate-400 leading-relaxed">Engineers talk to founders. Companies meet talent directly. No recruiters. No friction. Just authentic connections.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final CTA - Sophisticated */}
            <div className="w-full px-8 py-32">
                <div className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 via-blue-600/20 to-purple-600/20 blur-xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800"></div>
                    
                    <div className="relative z-10 p-12 md:p-16 text-center">
                        <h3 className="text-5xl font-black text-white mb-4">Ready to Connect?</h3>
                        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">Whether you're looking for your next role or your next engineer, CodeConnect is where great careers and great companies meet.</p>
                        <div className="flex gap-6 justify-center flex-wrap">
                            <Link 
                                to={jobsLink} 
                                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                            >
                                View Jobs
                            </Link>
                            <Link 
                                to="/post-job" 
                                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                            >
                                Post a Role
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Stats */}
            <div className="w-full px-8 py-24 border-t border-slate-800">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">5K+</div>
                        <p className="text-slate-400 mt-2">Engineers</p>
                    </div>
                    <div>
                        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">1K+</div>
                        <p className="text-slate-400 mt-2">Companies</p>
                    </div>
                    <div>
                        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">10K+</div>
                        <p className="text-slate-400 mt-2">Connections Made</p>
                    </div>
                </div>
            </div>
        </section>
    )
}