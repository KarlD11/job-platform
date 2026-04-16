import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, FileUp } from "lucide-react";
import { UserAuth } from "@/context/AuthContext";
import { supabase } from "@/supabaseClient";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

// ProfileSection allows users to manage their profile, upload CV, and update contact information
export default function ProfileSection() {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  // State for profile form inputs
  const [mobile, setMobile] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch existing profile data from Supabase
  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("mobile, cv_url")
        .eq("id", session.user.id)
        .single();

      if (!error && data) {
        setMobile(data.mobile || "");
      }
    };

    fetchProfile();
  }, [session]);

  // Save profile updates including CV upload
  const handleSave = async (e) => {
    e.preventDefault();
    if (!session?.user) return;

    setLoading(true);

    try {
      let cv_url = null;

      // Upload CV file if provided
      if (cvFile) {
        const filePath = `${session.user.id}/${cvFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("cvs")
          .upload(filePath, cvFile, { upsert: true });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from("cvs").getPublicUrl(filePath);
        cv_url = data.publicUrl;
      }

      // Update profile data in database
      const { error: dbError } = await supabase.from("profiles").upsert({
        id: session.user.id,
        mobile,
        cv_url,
      });

      if (dbError) throw dbError;

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error saving profile:", err.message);
      alert("Could not update profile.");
    } finally {
      setLoading(false);
    }
  };

  // Handle user logout
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <Navbar />

      <div className="pt-24 flex justify-center px-4 pb-12">
        <div className="w-full max-w-lg">
          {/* Profile card */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-700">
            {/* Header */}
            <h1 className="text-4xl font-black text-white text-center mb-8">
              My<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"> Profile</span>
            </h1>

            {/* User info display */}
            <div className="text-center mb-8 pb-8 border-b border-slate-700">
              <p className="text-2xl font-bold text-white">
                {session?.user?.user_metadata?.fullname || "User"}
              </p>
              <p className="text-slate-400 mt-2">{session?.user?.email}</p>
            </div>

            {/* Profile form */}
            <form className="space-y-6" onSubmit={handleSave}>
              {/* Mobile number input */}
              <div>
                <label htmlFor="mobile" className="block text-sm font-semibold text-white mb-2">
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* CV upload input */}
              <div>
                <label htmlFor="cv" className="block text-sm font-semibold text-white mb-2">
                  Upload CV
                </label>
                <div className="relative">
                  <FileUp className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <input
                    id="cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setCvFile(e.target.files[0])}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors file:bg-emerald-600 file:border-0 file:rounded file:px-3 file:py-1 file:text-white file:cursor-pointer"
                  />
                </div>
                {cvFile && <p className="text-sm text-emerald-400 mt-2">✓ {cvFile.name}</p>}
              </div>

              {/* Save button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>

            {/* Logout button */}
            <button
              onClick={handleSignOut}
              className="w-full mt-6 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 border border-red-600/50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
