import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export const RequireAuth = ({ children }) => {
    const location = useLocation();
    const { name, password } = useAuth();

    if (!name && !password) {
        return (
            <Navigate to='/login' state={{ from: location }}></Navigate>
        )
    }
    return children
};