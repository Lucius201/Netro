import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    return localStorage.getItem("jwt") ? (
        <Outlet />
    ) : (
        <Navigate to="/loginpage" />
    );
}
