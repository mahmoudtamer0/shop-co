import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }: any) {
    const token = localStorage.getItem("token");
    const location = useLocation();

    if (!token) {
        localStorage.setItem("redirectAfterLogin", location.pathname);
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default ProtectedRoute;