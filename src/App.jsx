import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./Layouts/app-layout";
import { ThemeProvider } from "@/components/theme-provider"

import PrivateRoute from "./routes/PrivateRoute";
import RecruiterRoute from "./routes/RecruiterRoute";

import JobSection from "./sections/JobSection"; 
import SingleJob from "./sections/SingleJob";
import MyJobSection from "./sections/MyJobSection";
import PostJobSection from "./sections/PostJobSection";
import SaveJobSection from "./sections/SaveJobSection";
import ApplicationsSection from "./sections/ApplicationsSection";
import OnboardingSection from "./sections/OnboardingSection";
import LandingSection from "./sections/LandingSection";
import ProfileSection from "./sections/ProfileSection";
import SignupSection from "./sections/SignupSection";
import SigninSection from "./sections/SigninSection";
import RecruiterSignupSection from "./sections/RecruiterSignupSection";
import RecruiterSigninSection from "./sections/RecruiterSigninSection";
import RecruiterDashboard from "./sections/RecruiterDashboard";
import { AuthContextProvider } from "./context/AuthContext";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      // Public routes
      { path: "/", element: <LandingSection /> },
      { path: "/signup", element: <SignupSection /> },
      { path: "/signin", element: <SigninSection /> },

      // Recruiter public routes
      { path: "/recruiter/signup", element: <RecruiterSignupSection /> },
      { path: "/recruiter/signin", element: <RecruiterSigninSection /> },

      // Private candidate routes
      { path: "/onboarding", element: <PrivateRoute><OnboardingSection /></PrivateRoute> },
      { path: "/jobs", element: <PrivateRoute><JobSection /></PrivateRoute> },
      { path: "/job/:job_id", element: <PrivateRoute><SingleJob /></PrivateRoute> },
      { path: "/post-job", element: <PrivateRoute><PostJobSection /></PrivateRoute> },
      { path: "/saved-job", element: <PrivateRoute><SaveJobSection /></PrivateRoute> },
      { path: "/applications", element: <PrivateRoute><ApplicationsSection /></PrivateRoute> },
      { path: "/my-jobs", element: <PrivateRoute><MyJobSection /></PrivateRoute> },
      { path: "/profile", element: <PrivateRoute><ProfileSection /></PrivateRoute> },

      // Private recruiter routes
      { path: "/recruiter/dashboard", element: <RecruiterRoute><RecruiterDashboard /></RecruiterRoute> },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;