import React, { useState } from "react";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Add login logic here
        console.log("Logging in with:", { email, password });
    };

    return (
        <>
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
