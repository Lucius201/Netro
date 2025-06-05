import NavBarNeu from "../components/NavBarNeu";
import RegisterField from "../components/RegisterField";
import "../styles/globals.css";

export default function RegisterPage() {
    return (
        <>
            <NavBarNeu /> {/* kein user notwendig */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    padding: "1rem",
                }}
            >
                <RegisterField />
            </div>
        </>
    );
}
