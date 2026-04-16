import { House, User, Briefcase, Bookmark, FileText, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserAuth } from '@/context/AuthContext';

const defaultNavItems = [
  { name: 'Home', href: '/jobs', icon: House },
  { name: 'Jobs', href: '/jobs', icon: Briefcase },
  { name: 'Saved', href: '/saved-job', icon: Bookmark },
  { name: 'Applications', href: '/applications', icon: FileText },
  { name: 'Profile', href: '/profile', icon: User },
];

const signedInNavItems = [
  { name: 'Jobs', href: '/jobs', icon: Briefcase },
  { name: 'Applications', href: '/applications', icon: FileText },
  { name: 'Saved Jobs', href: '/saved-job', icon: Bookmark },
  { name: 'Profile', href: '/profile', icon: User },
];

export default function Navbar() {
  const { session, signOut } = UserAuth();
  const [hasItScrolled, setHasItScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleHasItScrolled = () => {
      setHasItScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleHasItScrolled);
    return () => window.removeEventListener('scroll', handleHasItScrolled);
  }, []);

  const navItems = session ? signedInNavItems : defaultNavItems;

  return (
    <>
      <nav
        className={`fixed w-full top-0 z-50 text-white transition-all duration-300 ease-in-out ${
          hasItScrolled ? 'py-3 bg-slate-950/95 backdrop-blur-md shadow-xl' : 'py-5'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link className="text-xl font-bold tracking-tight text-white" to={session?.user ? '/jobs' : '/'}>
            code<span className="text-cyan-400">Connect.</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center gap-2 text-base hover:text-cyan-400 transition-colors duration-200 font-medium"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {!session ? (
              <>
                <Button variant="secondary" asChild>
                  <Link to="/signin">Login</Link>
                </Button>
                <Button variant="primary">
                  <Link to="/signup">Get Started</Link>
                </Button>
              </>
            ) : (
              <Button variant="destructive" onClick={signOut}>
                Logout
              </Button>
            )}
          </div>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/95 p-3 text-slate-200 shadow-lg shadow-slate-950/20 transition hover:bg-slate-800"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-sm md:hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
            <Link className="text-xl font-bold text-white" to={session?.user ? '/jobs' : '/'} onClick={() => setMenuOpen(false)}>
              code<span className="text-cyan-400">Connect.</span>
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-slate-900/95 p-3 text-slate-200 shadow-lg shadow-slate-950/20 hover:bg-slate-800"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="px-6 py-8 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-4 text-lg font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="px-6 pb-8 pt-4 border-t border-slate-700">
            {!session ? (
              <div className="space-y-3">
                <Button variant="secondary" asChild className="w-full">
                  <Link to="/signin" onClick={() => setMenuOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button variant="primary" className="w-full">
                  <Link to="/signup" onClick={() => setMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            ) : (
              <Button variant="destructive" className="w-full" onClick={() => { signOut(); setMenuOpen(false); }}>
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}