import React, { useEffect, useRef, useState } from "react";

type Message = {
  sender: string;
  text: string;
};

export default function Messenger() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const ws = useRef<WebSocket | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080"); // <-- deine Adresse

    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    ws.current.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = { sender: "Ich", text: newMessage };
    ws.current?.send(JSON.stringify(message));
    setMessages((prev) => [...prev, message]); // lokal anzeigen
    setNewMessage("");
  }

  return (
    <div
      style={{
        width: "350px",
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        height: "600px",
      }}
    >
      <h2 style={{ marginBottom: "1.5rem" }}>Messenger</h2>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          textAlign: "left",
          marginBottom: "1rem",
          paddingRight: "0.25rem",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              backgroundColor: msg.sender === "Ich" ? "#dcf8c6" : "#f1f0f0",
              padding: "0.5rem",
              borderRadius: "10px",
              marginBottom: "0.5rem",
              alignSelf: msg.sender === "Ich" ? "flex-end" : "flex-start",
              fontSize: "0.95rem",
              maxWidth: "80%",
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
            padding: "0.5rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#8d5ce0",
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#7a4ccc")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#8d5ce0")
          }
        >
          Senden
        </button>
      </form>
    </div>
  );
}
