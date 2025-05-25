import { useEffect, useState } from "react";

export default function ShowUsers() {
    const [users, setUsers] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/users", {
            method: "GET",
            credentials: "include", // JWT-Cookie wird mitgeschickt
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Fehler beim Laden: ${res.status}`);
                }
                return res.json();
            })
            .then((data: string[]) => {
                setUsers(data);
            })
            .catch((err) => {
                console.error("Fetch-Fehler:", err);
                setError("Benutzer konnten nicht geladen werden.");
            });
    }, []);

    return (
        <div style={{ padding: "2rem" }}>
            <h1>👥 Alle registrierten Benutzer (außer dir selbst)</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul>
                {users.map((user) => (
                    <li key={user}>{user}</li>
                ))}
            </ul>

            {users.length === 0 && !error && <p>Keine Benutzer gefunden.</p>}
        </div>
    );
}
