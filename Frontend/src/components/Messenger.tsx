import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar.tsx";
import ChatWindow from "./ChatWindow.tsx";

type ChatMessage = {
    senderId: string | null;
    receiverId: string | null;
    content: string | null;
    timestamp: string;
};

type User = {
    email: string;
    firstName: string;
    lastName: string;
};

function getCurrentUserEmailFromLocalStorage(): string | null {
    return localStorage.getItem("email");
}

export default function Messenger() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(null);
    // const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(null)
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [text, setText] = useState("");
    const bottomRef = useRef<HTMLDivElement>(null);
    const ws = useRef<WebSocket | null>(null);
    const currentUserEmail = getCurrentUserEmailFromLocalStorage();

    useEffect(() => {
        fetch("http://localhost:8080/userlist", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data: User[]) => {
                // Filter out yourself
                const filtered = data.filter(
                    (u) => u.email !== currentUserEmail,
                );
                setUsers(filtered);
            })
            ;
    }, [currentUserEmail]);

    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:8080/ws/chat");
        console.log(selectedUserEmail)
        // for (const user of users) {
        //     if (user.firstName + " " + user.lastName === selectedUser) {
        //         setSelectedUserEmail(user.email)
        //         console.log(user.email)
        //     }
        // }
        ws.current.onmessage = (event: MessageEvent) => {
            const msg: ChatMessage = JSON.parse(event.data);
            const isRelevant =
                (msg.senderId === selectedUserEmail &&
                    msg.receiverId === currentUserEmail) ||
                (msg.senderId === currentUserEmail &&
                    msg.receiverId === selectedUserEmail);

            if (isRelevant) {
                setMessages((prev) => [...prev, msg]);
            }
        };

        return () => {
            ws.current?.close();
        };
    }, [selectedUserEmail, currentUserEmail]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return;

        const msg: ChatMessage = {
            senderId: currentUserEmail,
            receiverId: selectedUserEmail,
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
                selectedUserEmail={selectedUserEmail}
                onSelectUser={(user) => {
                    setSelectedUserEmail(user);
                    setMessages([]);
                }}
            />
            <ChatWindow
                messages={messages}
                currentUserEmail={currentUserEmail}
                selectedUserEmail={selectedUserEmail}
                users={users}
                text={text}
                setText={setText}
                onSend={sendMessage}
                bottomRef={bottomRef}
            />
        </div>
    );
}
