import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { User, Mail, Lock, Building2 } from 'lucide-react';
import LandingNavbar from '@/components/LandingNavbar';
import { UserAuth } from '@/context/AuthContext';

// RecruiterSignupSection allows recruiters to create an account with the "recruiter" role
export default function RecruiterSignupSection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signUpNewUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signUpNewUser(email, password, fullname, "recruiter");

      if (result.success) {
        navigate('/recruiter/dashboard');
      } else {
        setError(result.error?.message || 'Sign up failed');
      }
    } catch (err) {
      console.error("Recruiter sign up error:", err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <LandingNavbar />

      <div className="min-h-screen flex items-center justify-center px-4 pt-28">
        <div className="w-full max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] items-center">
            {/* Left Panel */}
            <div className="bg-gradient-to-br from-slate-900/95 to-slate-950/90 rounded-3xl border border-slate-700 p-10 shadow-2xl shadow-emerald-500/5">
              <p className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold uppercase tracking-[0.2em] px-4 py-2 mb-6">
                For Recruiters
              </p>
              <h1 className="text-5xl font-black text-white leading-tight">
                Find the right tech talent, faster.
              </h1>
              <p className="mt-4 max-w-xl text-slate-400 text-lg leading-8">
                Post roles, review applicants, and connect with qualified engineers and developers all in one place.
              </p>

              <div className="mt-10 grid gap-4">
                <div className="rounded-3xl border border-slate-700 bg-slate-800/80 p-5">
                  <h2 className="text-sm uppercase tracking-[0.18em] text-slate-400 mb-2">Post & manage jobs</h2>
                  <p className="text-slate-300 text-sm leading-6">
                    Create job listings and manage applications from a centralised recruiter dashboard.
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-700 bg-slate-800/80 p-5">
                  <h2 className="text-sm uppercase tracking-[0.18em] text-slate-400 mb-2">Review applicants</h2>
                  <p className="text-slate-300 text-sm leading-6">
                    See candidate profiles, CVs, and cover letters in one place so you can make informed decisions quickly.
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-700 bg-slate-800/80 p-5">
                  <h2 className="text-sm uppercase tracking-[0.18em] text-slate-400 mb-2">Targeted talent pool</h2>
                  <p className="text-slate-300 text-sm leading-6">
                    Every candidate on CodeConnect is a tech professional — no noise, just relevant applications.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Panel — Form */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-slate-700 p-8">
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="h-7 w-7 text-emerald-400" />
                <h1 className="text-4xl font-black text-white">
                  Join as a<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400"> Recruiter</span>
                </h1>
              </div>
              <p className="text-slate-300 mb-8">Create your recruiter account on CodeConnect</p>

              <form onSubmit={handleSignUp} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      placeholder="Jane Smith"
                      className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Work Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="recruiter@company.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/20 border border-red-600/50 rounded-lg p-3">
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 mt-6"
                >
                  {loading ? "Creating account..." : "Create Recruiter Account"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-slate-400">
                  Already have a recruiter account?{" "}
                  <Link to="/recruiter/signin" className="text-emerald-400 hover:text-emerald-300 font-semibold">
                    Sign in
                  </Link>
                </p>
              </div>

              <div className="mt-3 text-center border-t border-slate-700 pt-4">
                <p className="text-slate-500 text-sm">
                  Looking for a job instead?{" "}
                  <Link to="/signup" className="text-slate-400 hover:text-white font-semibold">
                    Candidate sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
