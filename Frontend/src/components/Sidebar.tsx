type Props = {
    users: { email: string; firstName: string; lastName: string }[];
    selectedUserEmail: string | null;
    onSelectUser: (email: string) => void;
};

export default function Sidebar({ users, selectedUserEmail, onSelectUser }: Props) {
    return (
        <div
            style={{
                width: "250px",
                backgroundColor: "#0a0f1f",
                color: "#fff",
                padding: "1rem",
                paddingTop: "3rem",
                borderRight: "1px solid #333",
                boxSizing: "border-box",
            }}
        >
            <h3 style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>Chats</h3>
            {users.map((user) => {
                const fullName = `${user.firstName} ${user.lastName}`;
                return (
                    <div
                        key={user.email}
                        onClick={() => onSelectUser(user.email)}
                        style={{
                            padding: "0.5rem",
                            borderRadius: "10px",
                            marginBottom: "0.25rem",
                            cursor: "pointer",
                            backgroundColor:
                                selectedUserEmail === user.email
                                    ? "#00091a"
                                    : "transparent",
                        }}
                    >
                        {fullName}
                    </div>
                );
            })}
        </div>
    );
}
