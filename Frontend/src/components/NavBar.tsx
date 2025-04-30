import { Outlet, Link } from "react-router-dom";

const NavBar = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/LoginPage">Login Page</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    );
};

export default NavBar;
