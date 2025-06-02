import { useEffect, useRef, useState } from "react";

type Props = {
    receiver: string;
    currentUserEmail: string;
};

type ChatMessage = {
    senderEmail: string;
    receiverEmail: string;
    content: string;
    timestamp: Date;
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
                (msg.senderEmail === receiver &&
                    msg.receiverEmail === currentUserEmail) ||
                (msg.senderEmail === currentUserEmail &&
                    msg.receiverEmail === receiver);

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
            senderEmail: currentUserEmail,
            receiverEmail: receiver,
            content: text,
            timestamp: new Date()
        };
        setMessages((prev) => [...prev, msg]);
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
                        <b>{m.senderEmail}</b>: {m.content}
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
