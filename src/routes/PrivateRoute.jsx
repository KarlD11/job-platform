import { UserAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const { session, loading } = UserAuth();

    if (loading) {
        return null;
    }

    if (!session) {
        return <Navigate to="/signup" replace />;
    }

    return children;
}


