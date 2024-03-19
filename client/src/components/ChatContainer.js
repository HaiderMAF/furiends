import ChatHeader from "./ChatHeader";
import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";
import Leaderboard from "./Leaderboard";


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

        <MatchesDisplay/>

        <ChatDisplay/>
    </div>
    )
}
export default ChatContainer;