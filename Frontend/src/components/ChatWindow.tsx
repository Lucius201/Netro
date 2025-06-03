import React from "react";

type ChatMessage = {
    senderId: string | null;
    receiverId: string | null;
    content: string | null;
    timestamp: string;
};

type Props = {
    messages: ChatMessage[];
    currentUserEmail: string | null;
    selectedUser: string | null;
    text: string;
    setText: (t: string) => void;
    onSend: () => void;
    bottomRef: React.RefObject<HTMLDivElement | null>;
};

export default function ChatWindow({
    messages,
    currentUserEmail,
    selectedUser,
    text,
    setText,
    onSend,
    bottomRef,
}: Props) {
    if (!selectedUser) {
        return (
            <div
                style={{
                    flex: 1,
                    background:
                        "linear-gradient(to bottom, #00061380, #301934)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ccc",
                }}
            >
                Choose who you want to chat with
            </div>
        );
    }

    return (
        <div
            style={{
                flex: 1,
                background: "linear-gradient(to bottom, #00061380, #301934)",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxSizing: "border-box",
            }}
        >
            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    color: "#fff",
                    marginBottom: "1rem",
                }}
            >
                <h3 style={{ marginBottom: "0.5rem" }}>{selectedUser}</h3>
                {messages.map((msg, i) => {
                    const time = new Date(msg.timestamp).toLocaleString("de-DE", {
                        timeZone: "Europe/Berlin",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        timeZoneName: "short",
                    }).substring(12, 17);
                    // time = msg.timestamp

                    return (
                        <div
                            key={i}
                            style={{
                                backgroundColor:
                                    msg.senderId === currentUserEmail
                                        ? "#8d5ce0"
                                        : "#3a3a3a",
                                padding: "1rem 1rem 1rem 1rem",
                                borderRadius: "999px",
                                marginBottom: "0.5rem",
                                maxWidth: "70%",
                                alignSelf:
                                    msg.senderId === currentUserEmail
                                        ? "flex-end"
                                        : "flex-start",
                                position: "relative",
                            }}
                        >
                            <strong>{msg.senderId}: </strong>
                            {msg.content}
                            <span
                                style={{
                                    position: "absolute",
                                    bottom: "0.3rem",
                                    right: "1rem",
                                    fontSize: "0.75rem",
                                    opacity: 0.7,
                                }}
                            >
                                {time}
                            </span>
                            {/*<div style={{ marginTop: "0.25rem" }}>*/}
                            {/*    {msg.content}*/}
                            {/*</div>*/}
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSend();
                }}
                style={{ display: "flex", gap: "0.5rem" }}
            >
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Nachricht schreiben..."
                    style={{
                        flex: 1,
                        padding: "0.75rem 1rem",
                        borderRadius: "999px",
                        border: "1px solid #2e2e2e",
                        backgroundColor: "#3a3a3a",
                        color: "#fff",
                        fontSize: "1rem",
                        outline: "none",
                    }}
                    required
                />
                <button
                    type="submit"
                    style={{
                        padding: "0.75rem 1.5rem",
                        backgroundColor: "#8d5ce0",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        borderRadius: "999px",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Send
                </button>
            </form>
        </div>
    );
}
