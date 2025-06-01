import Messenger from "../components/Messenger";
import NavBar from "../components/NavBar";
import "../styles/globals.css";

function Chat() {
    console.groupCollapsed("Chat page rendered");
    return (
        <>
            <NavBar />
            <Messenger />
        </>
    );
}
export default Chat;
