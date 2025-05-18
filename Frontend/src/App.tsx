import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Landing from "./pages/Landing";
//import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";


function App() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/loginpage" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
                
            </Route>
        </Routes>
    );
}

export default App;
