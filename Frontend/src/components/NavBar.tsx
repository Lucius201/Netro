import styled from "styled-components";

const StyledNavbar = styled.nav`
    color: black;
`;
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

export default NavBar;
