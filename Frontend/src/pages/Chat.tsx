import Messenger from "../components/Messenger";
import Navbar from "../components/NavBarNeu";
import "../styles/globals.css";

function Chat() {
       // Hole Name und Avatar-URL des eingeloggten Users aus dem LocalStorage
    const name = localStorage.getItem("name");
    const avatarUrl = localStorage.getItem("avatarUrl");

    // Da die Chat-Seite nur für eingeloggte User ist, gehen wir davon aus, dass 'name' vorhanden ist
    const user = {
        name: name || "Unbekannt", // fallback nur für Sicherheit
        avatarUrl: avatarUrl || "", // leerer String falls kein Bild vorhanden
    };

    // Debug-Ausgabe (nur in Konsole sichtbar bei geöffnetem DevTools)
    console.groupCollapsed("Chat page rendered");

    return (
        <>
            <Navbar user={user}/>
            <Messenger />
        </>
    );
}
export default Chat;
