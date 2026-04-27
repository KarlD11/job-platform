import { supabaseClient, supabaseUrl } from "@/utils/supabase";

const APPLICATIONS_BUCKET = "CVs";

// - Apply to job ( candidate )
export async function applyToJob(token, _, jobData) {
  const supabase = await supabaseClient(token);
  const applicantId = jobData.user_id ?? jobData.candidate_id;

  if (!applicantId) {
    throw new Error("Missing applicant id");
  }

  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${applicantId}`;

  const { error: storageError } = await supabase.storage
    .from(APPLICATIONS_BUCKET)
    .upload(fileName, jobData.resume);

  if (storageError) throw new Error("Error uploading Resume");

  const resume = `${supabaseUrl}/storage/v1/object/public/${APPLICATIONS_BUCKET}/${fileName}`;
  const applicationPayload = {
    job_id: jobData.job_id,
    user_id: applicantId,
    cv: resume,
  };

  if (jobData.name) {
    applicationPayload.name = jobData.name;
  }

  const { data, error } = await supabase
    .from("applications")
    .insert([applicationPayload])
    .select();

  if (error) {
    console.error(error);
    throw new Error(error.message || "Error submitting application");
  }

  return data;
}

// // - Edit Application Status ( recruiter )
// export async function updateApplicationStatus(token, { job_id }, status) {
//   const supabase = await supabaseClient(token);
//   const { data, error } = await supabase
//     .from("applications")
//     .update({ status })
//     .eq("job_id", job_id)
//     .select();

//   if (error || data.length === 0) {
//     console.error("Error Updating Application Status:", error);
//     return null;
//   }

//   return data;
// }

export async function getApplications(token, { user_id }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("applications")
    .select("*, job:jobs(title, company:companies(name))")
    .eq("user_id", user_id);

  if (error) {
    console.error("Error fetching Applications:", error);
    return null;
  }

  return (data || []).map((application) => ({
    ...application,
    resume: application.cv,
    status: application.status ?? "pending",
  }));
}

// Minimal health check used by ApplicationsSection before fetching rows.
export async function testDatabaseConnection(token) {
  const supabase = await supabaseClient(token);
  const { error } = await supabase
    .from("applications")
    .select("id", { head: true, count: "exact" });

  if (error) {
    console.error("Database connection test failed:", error);
    return { success: false, error };
  }

  return { success: true };
}