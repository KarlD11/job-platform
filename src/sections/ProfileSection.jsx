import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "@/context/AuthContext";
import { supabase } from "@/supabaseClient";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfileSection() {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch existing profile data
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

  const handleSave = async (e) => {
    e.preventDefault();
    if (!session?.user) return;

    setLoading(true);

    try {
      let cv_url = null;

      // Upload CV if file chosen
      if (cvFile) {
        const filePath = `${session.user.id}/${cvFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("cvs")
          .upload(filePath, cvFile, { upsert: true });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from("cvs").getPublicUrl(filePath);
        cv_url = data.publicUrl;
      }

      // Save profile data to table
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

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 flex justify-center px-4">
        <Card className="w-full max-w-lg shadow-xl rounded-2xl">
          <CardHeader>
            <h1 className="text-3xl font-bold text-center">My Profile</h1>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-xl font-medium">
                Welcome,{" "}
                <span className="text-primary font-semibold">
                  {session?.user?.user_metadata?.fullname || "User"}
                </span>
              </p>
              <p className="text-muted-foreground mt-1">
                {session?.user?.email}
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSave}>
              <div>
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <Label htmlFor="cv">Upload CV</Label>
                <Input
                  id="cv"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setCvFile(e.target.files[0])}
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center">
            <Button
              onClick={handleSignOut}
              variant="destructive"
              className="px-6"
            >
              Logout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
