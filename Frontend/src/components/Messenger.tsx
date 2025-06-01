import React, { useRef, useState, useEffect } from "react";


type Message = {
  sender: string;
  receiver: string;
  text: string;
};

const currentUser = "Ich"; // TODO: aus Login übernehmen

export default function Messenger() {
  const [users, setUsers] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const ws = useRef<WebSocket | null>(null);

  // WebSocket-Verbindung aufbauen
  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onopen = () => {
      console.log("Verbunden mit WebSocket-Server");
      ws.current?.send(
        JSON.stringify({ type: "identify", user: currentUser })
      );
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "user_list") {
        const otherUsers = data.users.filter((u: string) => u !== currentUser);
        setUsers(otherUsers);
        if (!selectedUser && otherUsers.length > 0) {
          setSelectedUser(otherUsers[0]); // ersten Nutzer vorauswählen
        }
      }

      if (data.type === "message") {
        const msg: Message = data.payload;
        const isRelevant =
          (msg.sender === selectedUser && msg.receiver === currentUser) ||
          (msg.sender === currentUser && msg.receiver === selectedUser);

        if (isRelevant) {
          setMessages((prev) => [...prev, msg]);
        }
      }
    };

    ws.current.onerror = (err) => {
      console.error("WebSocket Fehler:", err);
    };

    return () => {
      ws.current?.close();
    };
  }, [selectedUser]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    const message: Message = {
      sender: currentUser,
      receiver: selectedUser,
      text: newMessage,
    };

    ws.current?.send(JSON.stringify({ type: "message", payload: message }));
    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        paddingTop: "60px",
      }}
    >
      {/* Seitenleiste */}
      <div
        style={{
          width: "250px",
          backgroundColor: "#0a0f1f",
          color: "#fff",
          padding: "1rem",
          paddingTop: "60px",
          borderRight: "1px solid #333",
          boxSizing: "border-box",
        }}
      >
        <h3
        style={{
            marginBottom: "1rem",
            fontSize: "1.1rem",
            textAlign: "left",
            color: "#aaa",
        }}
        >
        Chats
        </h3>

        {users.map((user) => (
        <div
            key={user}
            onClick={() => {
            setSelectedUser(user);
            setMessages([]);
            }}
            style={{
            padding: "0.5rem",
            borderRadius: "10px",
            marginBottom: "0.25rem",
            cursor: "pointer",
            fontSize: "0.9rem",
            textAlign: "left",
            color: "#fff",
            backgroundColor:
                selectedUser === user ? "#3a0a75" : "transparent",
            }}
        >
            {user}
        </div>
        ))}

      </div>

      {/* Chatbereich */}
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
        {selectedUser ? (
          <>
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                color: "#fff",
                marginBottom: "1rem",
              }}
            >
              <h3 style={{ marginBottom: "0.5rem", fontSize: "1.1rem" }}>
                {selectedUser}
              </h3>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor:
                      msg.sender === currentUser ? "#8d5ce0" : "#3a3a3a",
                    padding: "0.5rem 1rem",
                    borderRadius: "999px",
                    marginBottom: "0.5rem",
                    maxWidth: "70%",
                    alignSelf:
                      msg.sender === currentUser ? "flex-end" : "flex-start",
                    color: "#fff",
                    fontSize: "0,5rem",
                  }}
                >
                  <strong>{msg.sender}:</strong> {msg.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <form onSubmit={sendMessage} style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
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
          </>
        ) : (
          <div style={{ color: "#ccc", margin: "auto", fontSize: "1.2rem" }}>
            Choose who you want to chat with
          </div>
        )}
      </div>
    </div>
  );
}
