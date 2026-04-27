
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import LandingNavbar from '@/components/LandingNavbar';
import { UserAuth } from '@/context/AuthContext';

// SignInSection provides authentication for existing users with modern dark UI
export default function SignInSection() {
  // State for form inputs and status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signInUser } = UserAuth();
  const navigate = useNavigate();

  // Handle form submission and user authentication
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const result = await signInUser(email, password);

      if (result.success) {
        navigate('/profile');
      } else {
        setError(result.error?.message || 'Sign in failed');
      }
    } catch (error) {
      console.error("Sign in error:", error);
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
            <div className="rounded-3xl bg-slate-900/95 border border-slate-700 p-10 shadow-2xl shadow-cyan-500/5">
              <p className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-semibold uppercase tracking-[0.2em] px-4 py-2 mb-6">
                Why sign in?
              </p>
              <h1 className="text-5xl font-black text-white leading-tight">
                Unlock better tech opportunities faster.
              </h1>
              <p className="mt-4 max-w-xl text-slate-400 text-lg leading-8">
                Sign in to access exclusive developer roles, keep your applications organized, and discover personalized matches from top technology employers.
              </p>

              <div className="mt-10 grid gap-4">
                <div className="rounded-3xl border border-slate-700 bg-slate-800/80 p-5">
                  <h2 className="text-sm uppercase tracking-[0.18em] text-slate-400 mb-2">Curated tech listings</h2>
                  <p className="text-slate-300 text-sm leading-6">
                    Only the strongest engineering and product roles from companies that want to hire talent like you.
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-700 bg-slate-800/80 p-5">
                  <h2 className="text-sm uppercase tracking-[0.18em] text-slate-400 mb-2">Faster hiring flow</h2>
                  <p className="text-slate-300 text-sm leading-6">
                    Save jobs, track applications, and move from browse to interview with fewer clicks.
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-700 bg-slate-800/80 p-5">
                  <h2 className="text-sm uppercase tracking-[0.18em] text-slate-400 mb-2">Career-focused insights</h2>
                  <p className="text-slate-300 text-sm leading-6">
                    Discover roles matched to your skills and salary expectations in software, data, design, and infrastructure.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-slate-700 p-8">
              <h1 className="text-4xl font-black text-white mb-2">
                Welcome<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"> Back</span>
              </h1>
              <p className="text-slate-300 mb-8">Sign in to your CodeConnect account</p>

              {/* Sign In Form */}
              <form onSubmit={handleSignIn} className="space-y-5">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/20 border border-red-600/50 rounded-lg p-3">
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 mt-6"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-slate-400">
                  Not a member?{" "}
                  <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                    Create account
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
