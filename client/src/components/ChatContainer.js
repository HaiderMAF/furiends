import ChatHeader from "./ChatHeader";
import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";
import { Link } from "react-router-dom";
import { useState } from "react";

const ChatContainer = ({ user }) => {
    const [ clickedUser, setClickedUser ] = useState(null)
    
    return (
    <div className="chat-container">
        <ChatHeader user={user}/>

        <div>
            <Link to="/leaderboard">
                <button className="leaderboard-option">Leaderboard</button>
            </Link>
            <button className="option" onClick={() => setClickedUser(null)}>Matches</button>
            <button className="option" disabled={!clickedUser}>Chat</button>
        </div>

        {!clickedUser && <MatchesDisplay matches={user.matches} setClickedUser={setClickedUser}/>}
        
        {clickedUser &&<ChatDisplay user={user} clickedUser={clickedUser}/>}
    </div>
    )
}
export default ChatContainer;