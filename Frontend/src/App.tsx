import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
    return (
        <div>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/loginpage" element={<LoginPage />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
