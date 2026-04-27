import { UserAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

// RecruiterRoute protects pages that require the user to be signed in with role "recruiter"
export default function RecruiterRoute({ children }) {
    const { session, loading, userRole } = UserAuth();

    if (loading) {
        return null;
    }

    if (!session) {
        return <Navigate to="/recruiter/signin" replace />;
    }

    if (userRole !== "recruiter") {
        return <Navigate to="/recruiter/signin" replace />;
    }

    return children;
}
