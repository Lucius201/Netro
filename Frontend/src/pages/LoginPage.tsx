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
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                localStorage.setItem("email", email);
                navigate("/chat");
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
                    style={{
                      width: "450px",
                      background: "linear-gradient(to bottom, #00061380 10%, #00061380 70%, #3a0a75 100%, #3a0a75 100%)",
                      padding: "2rem",
                      borderRadius: "50px",
                      boxShadow: "0 0 5px rgba(128, 0, 255, 0.5)",
                      textAlign: "center",
                     }}
                    >
                    <h2>Login</h2>

                    <div style={{ marginBottom: "1rem" }}>
                        <label
                            htmlFor="email"
                            style={{ display: "block", marginBottom: "0.5rem" }}
                        >
                        </label>
                        <input
                        placeholder="Email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "0.75rem 1rem",
                          borderRadius: "999px",               // Pillenform
                          border: "1px solid #2e2e2e",       // Dunkelgraue Umrandung
                          backgroundColor: "#3a3a3a",          // Grauer Hintergrund
                          color: "#fff",                       // Weißer Text
                          fontSize: "1rem",
                          outline: "none",
                          marginBottom: "1rem",
                        }}
                        required
                      />
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                        <label
                            htmlFor="password"
                            style={{ display: "block", marginBottom: "0.5rem" }}
                        >
                        </label>
                        <input
                            placeholder="Password"
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                              width: "100%",
                              padding: "0.75rem 1rem",
                              borderRadius: "999px",               // Pillenform
                              border: "1px solid #2e2e2e",         // Dunkelgraue Umrandung
                              backgroundColor: "#3a3a3a",          // Grauer Hintergrund
                              color: "#fff",                       // Weißer Text
                              fontSize: "1rem",
                              outline: "none",
                              marginBottom: "1rem",
                            }}
                            required
                          />
                    </div>

                    <button
                        type="submit"
                        style={{
                          width: "50%",
                          padding: "0.75rem",
                          backgroundColor: "#8d5ce0",
                          color: "white",
                          fontWeight: "bold",
                          fontSize: "1rem",
                          borderRadius: "50px",
                          border: "none",
                          cursor: "pointer",
                          transition: "background-color 0.3s ease",
                         }}
                         onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#7a4ccc")}
                         onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#8d5ce0")}
                       >
                        Login
                    </button>
                </form>
            </div>
        </>
    );
}

export default LoginPage;
