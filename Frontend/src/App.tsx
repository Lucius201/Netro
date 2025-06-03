import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Landing from "./pages/Landing";
import RegisterPage from "./pages/RegisterPage";
import Chat from "./pages/Chat";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/loginpage" element={<LoginPage />} />
            <Route path="/registerpage" element={<RegisterPage />} />
            <Route path="/chat" element={<Chat />} />
        </Routes>
    );
}

export default App;
