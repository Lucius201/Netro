import "../styles/globals.css";
import React from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
    const sectionStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
    };

    const articleStyle: React.CSSProperties = {
        animation: "fadein-firstSection 1s",
    };

    const textBlockStyle: React.CSSProperties = {
        color: "var(--textgrey)",
        position: "relative",
        overflow: "hidden",
        top: "50%",
        transform: "translate(0, calc(-50% + 30px))",
    };

    const h1Style: React.CSSProperties = {
        fontSize: "3rem",
        fontWeight: "bold",
        lineHeight: "1.1",
        margin: 0,
    };

    const rainbowStyle: React.CSSProperties = {
        background:
            "linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-block",
    };

    const paragraphStyle: React.CSSProperties = {
        fontSize: "1.25rem",
        marginTop: "1rem",
        maxWidth: "40rem",
    };

    const ctaStyle: React.CSSProperties = {
        display: "inline-block",
        marginTop: "2rem",
        padding: "0.75rem 1.5rem",
        backgroundColor: "#8d5ce0",
        color: "#fff",
        borderRadius: "8px",
        textDecoration: "none",
        fontWeight: 600,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "background-color 0.3s ease",
    };

    return (
        <section style={sectionStyle}>
            <article style={articleStyle}>
                <div style={textBlockStyle}>
                    <h1 style={h1Style}>
                        Willkommen bei <span style={rainbowStyle}>NETRO</span>
                    </h1>
                    <p style={paragraphStyle}>
                        Hier ist dein erster Eindruck. Mach ihn unvergesslich.
                    </p>
                    <Link to="/registerpage" style={ctaStyle}>
                        Register
                    </Link>
                </div>
            </article>
        </section>
    );
}
