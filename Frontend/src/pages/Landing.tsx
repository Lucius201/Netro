import Navbar from "../components/NavBarNeu";
import HeroSection from "../components/HeroSection";
// import LogIn
import "../styles/globals.css";

function Landing() {
    // Holt Name und Avatar-URL des Users aus dem LocalStorage
    const name = localStorage.getItem("email");
    const avatarUrl = localStorage.getItem("avatarUrl");

    // Wenn ein Name vorhanden ist, wird ein User-Objekt erstellt.
    // Andernfalls ist der User null (nicht eingeloggt)
    const user = name ? { name, avatarUrl: avatarUrl || "" } : null;

    return (
        <>
            {/* Navigationsleiste, bekommt den User (oder null) übergeben */}
            <Navbar user={user} />

            <HeroSection />
        </>
    );
}

export default Landing;