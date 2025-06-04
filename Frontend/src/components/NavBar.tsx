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

export default function NavBar() {
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

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <header className="navbar" style={headerStyle}>
      <nav style={navStyle}>
        <h1 style={h1Style}>
          <Link to="/" style={linkStyle}>
            <i className="fa-sharp fa-solid fa-dice-d20"></i> Netro
          </Link>
        </h1>
        <ul style={ulStyle}>
          <li style={liStyle}>
            <Link to="/loginpage" style={linkStyle}>
              Login
            </Link>
            <ul style={ulStyle}>
          <li style={liStyle}>
            <Link to="/loginpage" style={linkStyle}>
             <img
              src={user.avatarUrl}
              alt={`${user.name}'s Avatar`}
              className="w-8 h-8 rounded-full"
            />
              <span>{user.name}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Navbar;