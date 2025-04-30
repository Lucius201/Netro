import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ReactDom from "react-dom/client";
import NavBar from "./components/NavBar";
// import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavBar />} />
                <Route path="/LoginPage" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
