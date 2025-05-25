import { useState } from 'react';
import UserList from '../components/UserList';
import ChatWindow from '../components/ChatWindow';

export default function ChatPage() {
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    const currentUserEmail = getCurrentUserEmailFromCookie();
    if (!currentUserEmail) return <p>Du bist nicht eingeloggt.</p>;

    return (
        <div>
            <h1>💬 1-zu-1 WebSocket Chat</h1>
            <div style={{ display: 'flex' }}>
                <UserList onSelectUser={setSelectedUser} currentUserEmail={currentUserEmail} />
                {selectedUser && (
                    <ChatWindow receiver={selectedUser} currentUserEmail={currentUserEmail} />
                )}
            </div>
        </div>
    );
}

function getCurrentUserEmailFromCookie(): string | null {
    const email = localStorage.getItem('email');
    if (!email) return null;
    return email;
}
