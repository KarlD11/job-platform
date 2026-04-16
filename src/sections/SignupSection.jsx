
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import LandingNavbar from '@/components/LandingNavbar';
import { UserAuth } from '@/context/AuthContext';

// SignupSection enables new users to create an account with dark modern design
export default function SignupSection() {
  // State for form inputs and status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signUpNewUser } = UserAuth();
  const navigate = useNavigate();

  // Handle form submission and user registration
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const result = await signUpNewUser(email, password, fullname);

      if (result.success) {
        navigate('/profile');
      } else {
        setError(result.error?.message || 'Sign up failed');
      }
    } catch (error) {
      console.error("Sign up error:", error);
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
            <div className="bg-gradient-to-br from-slate-900/95 to-slate-950/90 rounded-3xl border border-slate-700 p-10 shadow-2xl shadow-purple-500/5">
              <p className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 text-purple-300 text-xs font-semibold uppercase tracking-[0.2em] px-4 py-2 mb-6">
                Why join?
              </p>
              <h1 className="text-5xl font-black text-white leading-tight">
                Connect with the best technology opportunities.
              </h1>
              <p className="mt-4 max-w-xl text-slate-400 text-lg leading-8">
                Create your profile and gain access to top developer, data, and product roles curated for ambitious tech professionals.
              </p>

              <div className="mt-10 grid gap-4">
                <div className="rounded-3xl border border-slate-700 bg-slate-800/80 p-5">
                  <h2 className="text-sm uppercase tracking-[0.18em] text-slate-400 mb-2">Premium job network</h2>
                  <p className="text-slate-300 text-sm leading-6">
                    Tap into high-growth startups and established teams hiring remote, hybrid, and on-site tech talent.
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-700 bg-slate-800/80 p-5">
                  <h2 className="text-sm uppercase tracking-[0.18em] text-slate-400 mb-2">Smart matching</h2>
                  <p className="text-slate-300 text-sm leading-6">
                    See opportunities selected for your skillset, experience, and career goals so you apply with confidence.
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-700 bg-slate-800/80 p-5">
                  <h2 className="text-sm uppercase tracking-[0.18em] text-slate-400 mb-2">Faster onboarding</h2>
                  <p className="text-slate-300 text-sm leading-6">
                    Save jobs, track applications, and return to your best matches anytime with a single secure account.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-slate-700 p-8">
              <h1 className="text-4xl font-black text-white mb-2">
                Join<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> CodeConnect</span>
              </h1>
              <p className="text-slate-300 mb-8">Find your next opportunity in tech</p>

              {/* Sign Up Form */}
              <form onSubmit={handleSignUp} className="space-y-5">
                {/* Full Name Input */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                      required
                    />
                  </div>
                </div>

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
                      className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
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
                      className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
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

                {/* Sign Up Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 mt-6"
                >
                  {loading ? "Creating account..." : "Get Started"}
                </button>
              </form>

              {/* Sign In Link */}
              <div className="mt-6 text-center">
                <p className="text-slate-400">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-purple-400 hover:text-purple-300 font-semibold">
                    Sign in
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
