import { useEffect, useState } from "react";

type Props = {
    onSelectUser: (email: string) => void;
    currentUserEmail: string;
};


export default function UserList({ onSelectUser, currentUserEmail }: Props) {
    const [users, setUsers] = useState<string[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/users", {
            method: "GET",
            // eslint-disable-next-line no-irregular-whitespace
            credentials: "include", // Damit Cookies (z. B. JWT) mitgesendet werden!
        })
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error ${res.status}`);
                return res.json();
            })
            .then((data: string[]) => {
                const filtered = data.filter(
                    (email) => email !== currentUserEmail,
                );
                setUsers(filtered);
            })
            .catch((err) =>
                console.error("Fehler beim Laden der Nutzer:", err),
            );
    }, [currentUserEmail]);

    return (
        <div style={{ width: "200px", marginRight: "1rem" }}>
            <h3>Andere Nutzer</h3>
            <ul>
                {users.map((user) => (
                    <li key={user}>
                        <button onClick={() => onSelectUser(user)}>
                            {user}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
