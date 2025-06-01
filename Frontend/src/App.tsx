import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Landing from "./pages/Landing";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import Chat from "./pages/Chat";


function App() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/loginpage" element={<LoginPage />} />
            <Route path="/registerpage" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
            <Route path="/chat" element={<Chat />} />
                
            </Route>
        </Routes>
    );
}

export default App;
