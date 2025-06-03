import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar.tsx";
import ChatWindow from "./ChatWindow.tsx";

// Definiert den Typ für eine Chat-Nachricht
type ChatMessage = {
    senderId: string | null;    // E-Mail-Adresse des Absenders
    receiverId: string | null;  // E-Mail-Adresse des Empfängers
    content: string | null;     // Textinhalt der Nachricht
    timestamp: string;          // Zeitstempel im ISO-Format
};

// Liest die E-Mail-Adresse des aktuellen Benutzers aus dem localStorage.
// Gibt die E-Mail als String zurück oder null, falls nicht gesetzt.
function getCurrentUserEmailFromCookie(): string | null {
    return localStorage.getItem("email");
}

export default function Messenger() {
    // Zustand: Liste aller registrierten Benutzer (E-Mail-Adressen)
    const [users, setUsers] = useState<string[]>([]);
    // Zustand: aktuell gewählter Benutzer, mit dem der Chat geführt wird
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    // Zustand: alle Nachrichten im aktuellen Chatfenster
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    // Zustand: Textinhalt im Eingabefeld für neue Nachrichten
    const [text, setText] = useState("");
    // Referenz auf ein unsichtbares DIV-Element, um automatisch zum Ende der Nachrichten zu scrollen
    const bottomRef = useRef<HTMLDivElement>(null);
    // Referenz auf das WebSocket-Objekt, bleibt über Rerenders hinweg erhalten
    const ws = useRef<WebSocket | null>(null);
    // E-Mail-Adresse des aktuell angemeldeten Benutzers
    const currentUserEmail = getCurrentUserEmailFromCookie();

    /**
     * Aufbau der WebSocket-Verbindung und Empfang von Nachrichten
     * Dieser Effekt wird jedes Mal ausgeführt, wenn sich `selectedUser` oder
     * `currentUserEmail` ändert (also z. B. beim Wechsel des Chat-Partners).
     */
    useEffect(() => {
        // 1. Neue WebSocket-Verbindung zum Backend herstellen
        ws.current = new WebSocket("ws://localhost:8080/ws/chat");

        // 2. Callback-Funktion: Was passiert, wenn eine Nachricht ankommt?
        ws.current.onmessage = (event: MessageEvent) => {
            // 2.1. JSON-codierte Nachricht parsen
            const msg: ChatMessage = JSON.parse(event.data);

            // 2.2. Prüfen, ob die Nachricht relevant ist:
            //      - Entweder der ausgewählte Benutzer (selectedUser) hat uns (currentUserEmail) eine Nachricht
            //      - Oder wir (currentUserEmail) haben dem ausgewählten Benutzer (selectedUser) eine Nachricht gesendet
            const isRelevant =
                (msg.senderId === selectedUser && msg.receiverId === currentUserEmail) ||
                (msg.senderId === currentUserEmail && msg.receiverId === selectedUser);

            // 2.3. Falls relevant, die Nachricht zum lokalen Zustand hinzufügen
            if (isRelevant) {
                setMessages((prev) => [...prev, msg]);
            }
        };

        // 3. Aufräumen: Beim Verlassen oder Neuaufbauen des Effekts WebSocket-Verbindung schließen
        return () => {
            ws.current?.close();
        };
    }, [selectedUser, currentUserEmail]);

    /**
     * Laden der Benutzerliste vom Server.
     * Wird einmalig beim Mounten des Components und bei Änderung von `currentUserEmail` ausgeführt.
     */
    useEffect(() => {
        fetch("http://localhost:8080/users", {
            credentials: "include", // Cookies/Credentials mitsenden, falls nötig
        })
            .then((res) => res.json())
            .then((data: string[]) => {
                // Alle E-Mail-Adressen außer der eigenen herausfiltern
                const filtered = data.filter((u) => u !== currentUserEmail);
                setUsers(filtered);
            });
    }, [currentUserEmail]);

    /**
     * Automatisches Scrollen: Wenn sich `messages` ändert (z. B. neue Nachricht),
     * scrollt das Chatfenster zum `bottomRef`, um die neueste Nachricht anzuzeigen.
     */
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    /**
     * Funktion, um eine neue Nachricht zu senden.
     * Erzeugt ein ChatMessage-Objekt, fügt es lokal hinzu und sendet es per WebSocket.
     */
    const sendMessage = () => {
        // 1. Sicherstellen, dass WebSocket existiert und offen ist
        if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return;

        // 2. ChatMessage-Objekt mit den benötigten Feldern erstellen
        const msg: ChatMessage = {
            senderId: currentUserEmail,
            receiverId: selectedUser,
            content: text,
            timestamp: new Date().toISOString(), // Aktueller Zeitstempel
        };

        // 3. Nachricht lokal zum Chatverlauf hinzufügen (optimistisches Update)
        setMessages((prev) => [...prev, msg]);

        // 4. Nachricht als JSON-String per WebSocket an den Server schicken
        ws.current.send(JSON.stringify(msg));

        // 5. Eingabefeld zurücksetzen
        setText("");
    };

    return (
        <div style={{ display: "flex", height: "100vh", paddingTop: "60px" }}>
            {/* Sidebar-Komponente zeigt die Liste aller Benutzer */}
            <Sidebar
                users={users}
                selectedUser={selectedUser}
                onSelectUser={(user) => {
                    // Wenn ein Benutzer aus der Sidebar ausgewählt wird:
                    // 1. setze den neuen `selectedUser`
                    // 2. leere den Chatverlauf, damit später nur die Nachrichten mit dem neuen Partner angezeigt werden
                    setSelectedUser(user);
                    setMessages([]);
                }}
            />
            {/* ChatWindow-Komponente zeigt den aktuellen Chatverlauf und das Eingabefeld */}
            <ChatWindow
                messages={messages}               // Alle Nachrichten für das Rendering
                currentUserEmail={currentUserEmail} // E-Mail des aktuellen Benutzers für Styling/Unterscheidung
                selectedUser={selectedUser}       // E-Mail des Chat-Partners
                text={text}                       // Aktueller Texteingabe-Zustand
                setText={setText}                 // Setter-Funktion für das Texteingabe-Feld
                onSend={sendMessage}              // Funktion, die beim Klick auf „Senden“ aufgerufen wird
                bottomRef={bottomRef}             // DOM-Referenz für automatisches Scrollen
            />
        </div>
    );
}
