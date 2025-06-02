import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar.tsx";
import ChatWindowww from "./ChatWindowww.tsx";

type ChatMessage = {
    senderId: string | null;
    receiverId: string | null;
    content: string | null;
    timestamp: string;
};

function getCurrentUserEmailFromCookie(): string | null {
    return localStorage.getItem("email");
}

export default function Messenger() {
    const [users, setUsers] = useState<string[]>([]);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [text, setText] = useState("");
    const bottomRef = useRef<HTMLDivElement>(null);
    const ws = useRef<WebSocket | null>(null);
    const currentUserEmail = getCurrentUserEmailFromCookie();

    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:8080/ws/chat");

        ws.current.onmessage = (event: MessageEvent) => {
            const msg: ChatMessage = JSON.parse(event.data);
            const isRelevant =
                (msg.senderId === selectedUser &&
                    msg.receiverId === currentUserEmail) ||
                (msg.senderId === currentUserEmail &&
                    msg.receiverId === selectedUser);

            if (isRelevant) {
                setMessages((prev) => [...prev, msg]);
            }
        };

        return () => {
            ws.current?.close();
        };
    }, [selectedUser, currentUserEmail]);

    useEffect(() => {
        fetch("http://localhost:8080/users", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data: string[]) => {
                const filtered = data.filter((u) => u !== currentUserEmail);
                setUsers(filtered);
            });
    }, [currentUserEmail]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return;

        const msg: ChatMessage = {
            senderId: currentUserEmail,
            receiverId: selectedUser,
            content: text,
            timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, msg]);
        ws.current.send(JSON.stringify(msg));
        setText("");
    };

    return (
        <div style={{ display: "flex", height: "100vh", paddingTop: "60px" }}>
            <Sidebar
                users={users}
                selectedUser={selectedUser}
                onSelectUser={(user) => {
                    setSelectedUser(user);
                    setMessages([]);
                }}
            />
            <ChatWindowww
                messages={messages}
                currentUserEmail={currentUserEmail}
                selectedUser={selectedUser}
                text={text}
                setText={setText}
                onSend={sendMessage}
                bottomRef={bottomRef}
            />
        </div>
    );
}
