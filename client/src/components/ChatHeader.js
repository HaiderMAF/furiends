import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import ProfileDisplay from './ProfileDisplay';
import { useState } from "react";


const ChatHeader = ({ user }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['UserId', 'AuthToken']);
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false); 
    
    const logout = () => {
        removeCookie('UserId');
        removeCookie('AuthToken');
        navigate('/');
    };

    const toggleProfileModal = () => {
        setShowProfile(!showProfile); // Toggle the visibility of the profile modal
    };

    return (
        <>
            <div className="chat-container-header">
                <div className="profile" onClick={toggleProfileModal}> {/* Add onClick event to toggle modal */}
                    <div className="img-container">
                        <img src={user.url} alt={'photo of ' + user.first_name} />
                    </div>
                    <h3>{user.first_name}</h3>
                </div>
                <div className="logout-container">
                    <i className="log-out-icon" onClick={logout}>⇦</i>
                    <span className="logout-text" onClick={logout}>Logout</span>
                </div>
            </div>
            {showProfile && (
                <ProfileDisplay
                    clickedUser={user}
                    clickedUserImg={user.url}
                    clickedUserName={user.first_name}
                    clickedUserDOB={user.dob}
                    clickedUserGender={user.gender}
                    clickedUserBreed={user.breed}
                    clickedUserLocation={user.location}
                    clickedUserBio={user.bio}
                    onClose={toggleProfileModal} // Pass function to close the modal
                />
            )}
        </>
    );
};

export default ChatHeader;
