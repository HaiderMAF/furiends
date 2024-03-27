import { useState } from 'react';
import ProfileDisplay from './ProfileDisplay';

const Chat = ({ descendingOrderMessages, clickedUser, clickedUserImg }) => {
    const [showProfile, setShowProfile] = useState(false);

    const handleClickProfile = () => {
        setShowProfile(!showProfile);
    };

    const handleCloseProfile = () => {
        setShowProfile(false);
    };
 
    return (
        <>
            <div className="chat-display">
                <div className="clickedProfileImg">
                    <img onClick={handleClickProfile} src={clickedUserImg} alt={clickedUser?.first_name + ' profile'} />
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
            {/* Render the profile display component if showProfile is true */}
            {showProfile && (
                <ProfileDisplay
                    clickedUser={clickedUser}
                    clickedUserImg={clickedUser?.url}
                    clickedUserName={clickedUser?.first_name}
                    clickedUserDOB={clickedUser?.dob}
                    clickedUserGender={clickedUser?.gender}
                    clickedUserBreed={clickedUser?.breed}
                    clickedUserLocation={clickedUser?.location}
                    clickedUserBio={clickedUser?.bio}
                    // Add other clicked user details as props
                    onClose={handleCloseProfile} // Pass a function to handle closing the profile display
                />
            )}
        </>
    );
};

export default Chat;