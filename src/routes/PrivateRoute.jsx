import { UserAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';


export default function PrivateRoute({ children }) {
    const { session } = UserAuth();

    if(!session) {
        return <Navigate to="/signup" />
    }
    return children;

}

