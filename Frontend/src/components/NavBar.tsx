export default function NavBar() {
    return (
        <header className="navbar">
            <nav>
                <h1>
                    <Link to="/" className="title">
                        <i className="fa-sharp fa-solid fa-dice-d20"></i> Netro
                    </Link>
                </h1>
                <ul>
                    <li>
                        <Link to="/loginpage">Login</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
