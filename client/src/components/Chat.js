const Chat = ({ descendingOrderMessages, clickedUser, clickedUserImg }) => {
    return (
        <>
            <div className="chat-display">
                <div className="clickedProfileImg">
                    <img src={clickedUserImg} alt={clickedUser?.first_name + ' profile'} />
                </div>
                <u><b><p className="chat-fname">{clickedUser?.first_name}</p></b></u>
                {descendingOrderMessages.map((message, index) => (
                    <div key={index}>
                        <div className="img-container">
                            <img src={message.img} alt={message.name + ' profile'} />
                        </div>
                        <div className="chat-message-header">
                            <b><p>{message.name}</p></b>
                            <p>{message.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Chat;