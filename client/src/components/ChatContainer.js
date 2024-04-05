import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";
import RandomQuote from "./RandomQuote"; // Import the RandomQuote component
import { Link } from "react-router-dom";

const ChatContainer = ({ user }) => {
  const [clickedUser, setClickedUser] = useState(null);

  return (
    <div className="chat-container">
      <ChatHeader user={user} />

      <div>
        <button className="option" onClick={() => setClickedUser(null)}>
          Matches
        </button>
        <button className="option" disabled={!clickedUser}>
          Chat
        </button>
      </div>

      {!clickedUser && (
        <MatchesDisplay matches={user.matches} setClickedUser={setClickedUser} />
      )}

      {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser} />}
      <RandomQuote />
    </div>
  );
};
export default ChatContainer;