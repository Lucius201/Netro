import { Link } from "react-router-dom";
import '../styles/styles.css';
import styled from "styled-components";

function Navbar() {

    return (
        <StyledNavbar>
            <div className="w-full h-25 absolute bg-amber-50 flex justify-center">
                <nav className="absolute bg-amber-200 flex justify-between h-full w-full max-w-300">
                    <h1>
                        <Link to="/" className="">
                            <i className="fa-sharp fa-solid fa-dice-d20"></i> Netro
                        </Link>
                    </h1>
                    <ul>
                        <li>
                            <Link to="/loginpage" className="">
                                Login
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </StyledNavbar>
    );
}
const StyledNavbar = styled.nav`
    
    nav {
        padding-top: 45px;
        padding-left: 30px;
        padding-right: 30px;

        animation: fadeinNav 1s;
        transition: padding-top 0.3s ease-in-out, height 0.3s ease-in-out;
        z-index: 1000;
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

    nav.navbar-on-scroll {
        padding-top: 15px;
        height: 70px;
        border-bottom: 1px solid #333333;
    }
    
`;

export default Navbar;
