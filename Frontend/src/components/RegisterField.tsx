import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/globals.css";

export default function RegisterField() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert("Registrierung erfolgreich!");
        navigate("/loginpage");
      } else {
        const errorText = await response.text();
        alert("Registrierung fehlgeschlagen: " + errorText);
      }
    } catch (err) {
      console.error("Register error:", err);
      alert("Ein Fehler ist aufgetreten.");
    }
  }

  return (
    <form
      onSubmit={handleRegister}
      style={{
        width: "450px",
        backgroundColor: "#000613",
        padding: "2rem",
        borderRadius: "50px",
        boxShadow: "0 0 5px rgba(128, 0, 255, 0.5)",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "1.5rem" }}>Create an account</h2>

      <div style={{ marginBottom: "1rem", textAlign: "left" }}>
        <label
          htmlFor="email"
          style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "50px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
          required
        />
      </div>

      <div style={{ marginBottom: "1.5rem", textAlign: "left" }}>
        <label
          htmlFor="password"
          style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "50px",
            border: "1px solid #ccc",
            fontSize: "1rem",
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
        Sign up
      </button>
    </form>
  );
}
