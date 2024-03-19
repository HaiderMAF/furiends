import ChatHeader from "./ChatHeader";
import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";
<<<<<<< HEAD
import Leaderboard from "./Leaderboard";

=======
>>>>>>> 42140c63ed91374c4271d3d42dcdbc11f3cdf591

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