import { useEffect, useRef, useState } from "react";

type Props = {
    receiver: string;
    currentUserEmail: string;
};

type ChatMessage = {
    senderId: string;
    receiverId: string;
    content: string;
    timestamp: string;
};

export default function ChatWindow({ receiver, currentUserEmail }: Props) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [text, setText] = useState("");
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:8080/ws/chat");

        ws.current.onmessage = (event: MessageEvent) => {
            const msg: ChatMessage = JSON.parse(event.data);
            const isRelevant =
                (msg.senderId === receiver &&
                    msg.receiverId === currentUserEmail) ||
                (msg.senderId === currentUserEmail &&
                    msg.receiverId === receiver);

            if (isRelevant) {
                setMessages((prev) => [...prev, msg]);
            }
        };

        return () => {
            ws.current?.close();
        };
    }, [receiver, currentUserEmail]);

    const sendMessage = () => {
        if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return;

        const msg: ChatMessage = {
            senderId: currentUserEmail,
            receiverId: receiver,
            content: text,
            timestamp: new Date().toISOString(),
        };

        ws.current.send(JSON.stringify(msg));
        setText("");
    };

    return (
        <div>
            <h3>Chat mit: {receiver}</h3>
            <div
                style={{
                    border: "1px solid gray",
                    height: "200px",
                    overflowY: "scroll",
                    padding: "0.5rem",
                }}
            >
                {messages.map((m, idx) => (
                    <div key={idx}>
                        <b>{m.senderId}</b>: {m.content}
                    </div>
                ))}
            </div>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Nachricht..."
            />
            <button onClick={sendMessage}>Senden</button>
        </div>
    );
}
