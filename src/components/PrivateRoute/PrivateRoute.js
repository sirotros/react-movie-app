import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const isAuthenticated = JSON.parse(localStorage.getItem("api_key"));
    if (!isAuthenticated) return <Navigate to="/api_key" replace />;
    return children;
}

export default PrivateRoute;
