import { Link } from "react-router-dom";
import "../styles/globals.css";
import React, { useEffect, useState } from "react";

type UserDTO = {
    email: string;
    firstName: string;
    lastName: string;
};

function NavBar() {
    const [user, setUser] = useState<UserDTO | null>(null);

    useEffect(() => {
        const email = localStorage.getItem("email");
        if (!email) return;

        const fetchUser = async () => {
            try {
                const response = await fetch("http://localhost:8080/user", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                });

                if (!response.ok) throw new Error("User not found");

                const userData: UserDTO = await response.json();
                console.log(userData);
                setUser(userData);
            } catch (err) {
                console.error("Failed to fetch user:", err);
            }
        };

        fetchUser();
    }, []);

    const headerStyle: React.CSSProperties = {
        backgroundColor: "var(--background)",
        padding: "45px 0 0.6rem 0",
        height: "100px",
        transition: "padding-top 0.3s ease-in-out, height 0.3s ease-in-out",
        zIndex: 1000,
        borderBottom: "none",
        position: "absolute",
        width: "100%",
    };

    const navStyle: React.CSSProperties = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "75rem",
        margin: "0 auto",
        padding: "0 4rem",
    };

    const h1Style: React.CSSProperties = {
        fontSize: "1.3rem",
    };

    const ulStyle: React.CSSProperties = {
        display: "flex",
        listStyle: "none",
        padding: 0,
        margin: 0,
    };

    const liStyle: React.CSSProperties = {
        marginLeft: "1.25rem",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
    };

    const linkStyle: React.CSSProperties = {
        textDecoration: "none",
        color: "inherit",
    };

    return (
        <header className="navbar" style={headerStyle}>
            <nav style={navStyle}>
                <h1 style={h1Style}>
                    <Link to="/" style={linkStyle}>
                        <i className="fa-sharp fa-solid fa-dice-d20"></i> Netro
                    </Link>
                </h1>
                <ul style={ulStyle}>
                    {user ? (
                        <li style={liStyle}>
                            {user.firstName} {user.lastName}
                        </li>
                    ) : (
                        <li style={liStyle}>
                            <Link to="/loginpage" style={linkStyle}>
                                Login
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;
