import { useEffect, useState, useRef } from "react";

export default function WebSocketChat() {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState("");
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:8080/ws/chat");

        ws.current.onmessage = (event: MessageEvent) => {
            setMessages((prev) => [...prev, event.data]);
        };

        ws.current.onopen = () => console.log("WebSocket verbunden");
        ws.current.onerror = (err) => console.error("WebSocket Fehler", err);
        ws.current.onclose = () => console.log("WebSocket getrennt");

        return () => ws.current?.close();
    }, []);

    const sendMessage = () => {
        if (input && ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(input);
            setInput("");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-4 shadow-xl rounded-2xl bg-white">
            <h1 className="text-xl font-bold mb-4">WebSocket Chat</h1>
            <div className="h-64 overflow-y-scroll border p-2 rounded mb-4">
                {messages.map((msg, idx) => (
                    <div key={idx} className="mb-1">{msg}</div>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    className="border rounded p-2 flex-1"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Nachricht eingeben..."
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={sendMessage}
                >
                    Senden
                </button>
            </div>
        </div>
    );
}
