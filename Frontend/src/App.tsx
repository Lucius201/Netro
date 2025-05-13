import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import About from "./pages/About";
import ProtectedRoute from "./ProtectedRoute";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loginpage" element={<LoginPage />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/about" element={<About />} />
            </Route>
        </Routes>
    );
}

export default App;
