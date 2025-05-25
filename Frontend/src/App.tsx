import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/Landing";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import ChatPage from "./pages/ChatPage";
import ShowUsers from "./pages/ShowUsers";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/loginpage" element={<LoginPage />} />
            <Route path="/registerpage" element={<RegisterPage />} />
            <Route path="/users" element={<ShowUsers />} />

            {/* Geschützter Bereich */}
            <Route element={<ProtectedRoute />}>
                <Route path="/chat" element={<ChatPage />} />
            </Route>
        </Routes>
    );
}

export default App;
