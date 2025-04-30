import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ReactDom from "react-dom/client";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route index element={<LoginPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
