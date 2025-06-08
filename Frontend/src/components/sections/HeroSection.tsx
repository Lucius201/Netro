import { Link } from "react-router-dom";
import { useEffect } from "react";
import { create3DNetwork } from "./net.js";

export default function HeroSection() {
    const sectionStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    };

    const articleStyle: React.CSSProperties = {
        animation: "fadein-firstSection 1s",
    };

    const textBlockStyle: React.CSSProperties = {
        color: "var(--textgrey)",
        position: "relative",
        overflow: "hidden",
        top: "100%",
        transform: "translate(0, calc(-50% - 60px))",
    };

    const h1Style: React.CSSProperties = {
        fontSize: "3rem",
        fontWeight: "bold",
        lineHeight: "1.1",
        margin: 0,
    };

    const rainbowStyle: React.CSSProperties = {
        backgroundImage:
            "linear-gradient(to right, rgb(127, 113, 255), rgb(123, 0, 255), rgb(166, 0, 255), rgb(255, 0, 149), orange)",
        color: "transparent",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        display: "inline",
        paddingRight: "0.125rem",
    };

    const paragraphStyle: React.CSSProperties = {
        fontSize: "1.25rem",
        marginTop: "0.15rem",
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

    useEffect(() => {
        const container = document.getElementById("network-container");
        if (container) {
            create3DNetwork(container);
        }
    }, []);

    const email = localStorage.getItem("email");

    return (
        <section style={sectionStyle}>
            <article style={articleStyle}>
                <div style={textBlockStyle}>
                    <h1 style={h1Style}>
                        Connect with{" "}
                        <span style={rainbowStyle}>New People</span>
                    </h1>
                    <p style={paragraphStyle}>The Messenger Application.</p>
                    {email ? null : (
                        <Link to="/registerpage" style={ctaStyle}>
                            Register Now
                        </Link>
                    )}
                </div>
            </article>

            <div className="net-container">
                <div id="network-container"></div>
            </div>
        </section>
    );
}
