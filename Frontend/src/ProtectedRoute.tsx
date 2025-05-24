import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProtectedRoute() {
    const [authorized, setAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/me", {
            credentials: "include",
        })
            .then((res) => setAuthorized(res.ok))
            .catch(() => setAuthorized(false));
    }, []);

    if (authorized === null) {
        return <div>⏳ Prüfe Authentifizierung…</div>;
    }
    return authorized ? <Outlet /> : <Navigate to="/loginpage" replace />;
}
