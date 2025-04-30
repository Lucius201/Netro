import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-gray-800 text-white p-4 flex gap-4">
            <ul>
                <li>
                    <Link to="/" className="hover:underline">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/about" className="hover:underline">
                        About
                    </Link>
                </li>
                <li>
                    <Link to="/loginpage" className="hover:underline">
                        Login
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
