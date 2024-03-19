import ChatHeader from "./ChatHeader";
import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";

const ChatContainer = ({ user }) => {
    return (
    <div className="chat-container">
        <ChatHeader user={user}/>

        <div>
            <button className="option">Matches</button>
            <button className="option">Chat</button>
            <button className="option">Leaderboard</button>
            <button className="option">My Profile</button>
        </div>

        <MatchesDisplay matches={user.matches}/>

        <ChatDisplay/>
    </div>
    )
}
export default ChatContainer;