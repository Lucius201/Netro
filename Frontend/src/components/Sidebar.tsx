type Props = {
    users: string[];
    selectedUser: string | null;
    onSelectUser: (user: string) => void;
};

export default function Sidebar({ users, selectedUser, onSelectUser }: Props) {
    return (
        <div
            style={{
                width: "250px",
                backgroundColor: "#0a0f1f",
                color: "#fff",
                padding: "1rem",
                borderRight: "1px solid #333",
                boxSizing: "border-box",
            }}
        >
            <h3 style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>Chats</h3>
            {users.map((user) => (
                <div
                    key={user}
                    onClick={() => onSelectUser(user)}
                    style={{
                        padding: "0.5rem",
                        borderRadius: "10px",
                        marginBottom: "0.25rem",
                        cursor: "pointer",
                        backgroundColor:
                            selectedUser === user ? "#3a0a75" : "transparent",
                    }}
                >
                    {user}
                </div>
            ))}
        </div>
    );
}
