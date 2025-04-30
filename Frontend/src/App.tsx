import { useState } from "react";
import netroLogo from "./assets/netro.png";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div>
                <header>
                    <nav>
                        <h1>
                            <a href="/">
                                <i className="fa-sharp fa-solid fa-dice-d20"></i>{" "}
                                Netro
                            </a>
                        </h1>
                        <ul>
                            <li>
                                <a href="/">
                                    <i className="fa-regular fa-circle-user"></i>{" "}
                                    Sign In
                                </a>
                            </li>
                        </ul>
                    </nav>
                </header>

                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={netroLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Netro</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

export default App;
