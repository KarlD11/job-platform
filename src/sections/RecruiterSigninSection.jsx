import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Mail, Lock, Building2 } from 'lucide-react';
import LandingNavbar from '@/components/LandingNavbar';
import { UserAuth } from '@/context/AuthContext';

// RecruiterSigninSection authenticates existing recruiters and guards against candidate accounts
export default function RecruiterSigninSection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signInUser, signOut } = UserAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signInUser(email, password);

      if (result.success) {
        const role = result.data?.user?.user_metadata?.role;
        if (role !== "recruiter") {
          await signOut();
          setError("This account is not registered as a recruiter. Please use the candidate sign-in page.");
        } else {
          navigate('/recruiter/dashboard');
        }
      } else {
        setError(result.error?.message || 'Sign in failed');
      }
    } catch (err) {
      console.error("Recruiter sign in error:", err);
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
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] items-center">
            {/* Left Panel */}
            <div className="rounded-3xl bg-slate-900/95 border border-slate-700 p-10 shadow-2xl shadow-emerald-500/5">
              <p className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold uppercase tracking-[0.2em] px-4 py-2 mb-6">
                Recruiter Portal
              </p>
              <h1 className="text-5xl font-black text-white leading-tight">
                Back to finding great tech talent.
              </h1>
              <p className="mt-4 max-w-xl text-slate-400 text-lg leading-8">
                Sign in to manage your job listings, review applications, and connect with qualified candidates.
              </p>

              <div className="mt-10 grid gap-4">
                <div className="rounded-3xl border border-slate-700 bg-slate-800/80 p-5">
                  <h2 className="text-sm uppercase tracking-[0.18em] text-slate-400 mb-2">Live job listings</h2>
                  <p className="text-slate-300 text-sm leading-6">
                    See all your active postings and track how many candidates have applied in real time.
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-700 bg-slate-800/80 p-5">
                  <h2 className="text-sm uppercase tracking-[0.18em] text-slate-400 mb-2">Applicant profiles</h2>
                  <p className="text-slate-300 text-sm leading-6">
                    Review CVs, portfolios, and application notes from developers who want to work with you.
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-700 bg-slate-800/80 p-5">
                  <h2 className="text-sm uppercase tracking-[0.18em] text-slate-400 mb-2">Streamlined hiring</h2>
                  <p className="text-slate-300 text-sm leading-6">
                    Stay organised with all your hiring activity in a dedicated recruiter workspace.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Panel — Form */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-slate-700 p-8">
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="h-7 w-7 text-emerald-400" />
                <h1 className="text-4xl font-black text-white">
                  Recruiter<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400"> Sign In</span>
                </h1>
              </div>
              <p className="text-slate-300 mb-8">Access your CodeConnect recruiter account</p>

              <form onSubmit={handleSignIn} className="space-y-5">
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
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-slate-400">
                  Don't have a recruiter account?{" "}
                  <Link to="/recruiter/signup" className="text-emerald-400 hover:text-emerald-300 font-semibold">
                    Sign up
                  </Link>
                </p>
              </div>

              <div className="mt-3 text-center border-t border-slate-700 pt-4">
                <p className="text-slate-500 text-sm">
                  Looking for a job?{" "}
                  <Link to="/signin" className="text-slate-400 hover:text-white font-semibold">
                    Candidate sign in
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
