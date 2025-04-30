import styled from "styled-components";
import "../styles/variables.css";

function NavBar() {
    return (
        <StyledNavbar>
            <h1>
                <a className="title">
                    <i className="fa-sharp fa-solid fa-dice-d20"></i> Netro
                </a>
            </h1>
            <ul>
                <li>
                    <a>
                        <i className="fa-regular fa-circle-user"></i> Sign In
                    </a>
                </li>
            </ul>
        </StyledNavbar>
    );
}
const StyledNavbar = styled.nav`
    .title {
        color: var(--text);
        text-decoration: none;
        font-weight: 600;
        font-size: 2rem;
    }

    header {
        padding: 45px 0 0.6rem 0;
        height: 100px;
        animation: fadeinNav 1s;
        transition: padding-top 0.3s ease-in-out, height 0.3s ease-in-out;
        z-index: 1000;
        border-bottom: none;
        position: absolute;
        width: 100%;
    }

    @keyframes fadeinNav {
        0% {
            top: -1.5rem;
            opacity: 0;
        }
        100% {
            top: 0;
            opacity: 1;
        }
    }

    header.navbar-on-scroll {
        padding-top: 15px;
        height: 70px;
        border-bottom: 1px solid #333333;
    }

    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 75rem;
        margin: 0 auto;
        padding: 0 4rem;
    }

    nav h1 {
        background-color: var(--background);
        font-size: 1.3rem;
    }

    nav ul {
        display: flex;
    }

    nav ul li {
        margin-left: 1.25rem;
        cursor: pointer;
        display: flex;
        align-items: center;
    }
`;

export default NavBar;
