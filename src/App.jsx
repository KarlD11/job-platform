import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./Layouts/app-layout";
import { ThemeProvider } from "@/components/theme-provider"

import PrivateRoute from "./routes/PrivateRoute";

import JobSection from "./sections/JobSection"; 
import MyJobSection from "./sections/MyJobSection";
import PostJobSection from "./sections/PostJobSection";
import SaveJobSection from "./sections/SaveJobSection";
import ApplicationsSection from "./sections/ApplicationsSection";
import OnboardingSection from "./sections/OnboardingSection";
import LandingSection from "./sections/LandingSection";
import ProfileSection from "./sections/ProfileSection";
import SignupSection from "./sections/SignupSection";
import SigninSection from "./sections/SigninSection";
import { AuthContextProvider } from "./context/AuthContext";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      // Public routes
      { path: "/", element: <LandingSection /> },
      { path: "/signup", element: <SignupSection /> },
      { path: "/signin", element: <SigninSection /> },

      // Private routes
      { path: "/onboarding", element: <PrivateRoute><OnboardingSection /></PrivateRoute> },
      { path: "/jobs", element: <PrivateRoute><JobSection /></PrivateRoute> },
      { path: "/post-job", element: <PrivateRoute><PostJobSection /></PrivateRoute> },
      { path: "/saved-job", element: <PrivateRoute><SaveJobSection /></PrivateRoute> },
      { path: "/my-jobs", element: <PrivateRoute><MyJobSection /></PrivateRoute> },
      { path: "/profile", element: <PrivateRoute><ProfileSection /></PrivateRoute> },
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