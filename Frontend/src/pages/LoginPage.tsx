import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import "../styles/globals.css";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const { token } = await response.json();
                localStorage.setItem("jwt", token);
                navigate("/");
            } else {
                alert("Invalid credentials");
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("An error occurred");
        }
    }

    return (
        <>
            <Navbar />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <form
                    onSubmit={handleLogin}
                    style={{ width: "300px", textAlign: "center" }}
                >
                    <h2>Login</h2>

                    <div style={{ marginBottom: "1rem" }}>
                        <label
                            htmlFor="email"
                            style={{ display: "block", marginBottom: "0.5rem" }}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: "100%", padding: "0.5rem" }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                        <label
                            htmlFor="password"
                            style={{ display: "block", marginBottom: "0.5rem" }}
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: "100%", padding: "0.5rem" }}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
                    >
                        Login
                    </button>
                </form>
            </div>
        </>
    );
}

export default LoginPage;
