import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Landing from "./pages/Landing";
import RegisterPage from "./pages/RegisterPage";
import Chat from "./pages/Chat";
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/loginpage" element={<LoginPage />} />
                <Route path="/registerpage" element={<RegisterPage />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;
