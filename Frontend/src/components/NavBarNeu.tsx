import { Link } from "react-router-dom";
import '../styles/globals.css';
import React from 'react';

type User = {
  name: string;
  avatarUrl: string;
};

type NavbarProps = {
  user: User | null; // null, wenn nicht angemeldet
};

// Nur EINE default-Export-Funktion
const NavBar: React.FC<NavbarProps> = ({ user }) => {
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
            // Wenn user angemeldet ist, Avatar + Name anzeigen
            <li style={liStyle}>
              <Link to="/profile" style={linkStyle}>
                {/* <img
                  src={user.avatarUrl}
                  alt={`${user.name}'s Avatar`}
                  style={{ width: "32px", height: "32px", borderRadius: "50%", marginRight: "0.5rem" }}
                /> */}
                <span>{localStorage.getItem("e-mail")}</span>
              </Link>
            </li>
          ) : (
            // Wenn NICHT angemeldet, Login-Link zeigen
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
};

export default NavBar;
