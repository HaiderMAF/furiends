import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import ProfileDisplay from './ProfileDisplay';
import { useState } from "react";
import OnBoarding from '../pages/OnBoarding';


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
        setShowProfile(!showProfile);
    };

    const editProfile = () => {
        setShowProfile(false);
        navigate('/edit-profile', { state: { user } });
    };

    return (
        <>
            <div className="chat-container-header">
                <div className="profile" onClick={toggleProfileModal}>
                    <div className="img-container">
                        <img src={user.url} alt={'photo of ' + user.first_name} />
                    </div>
                    <h3>{user.first_name}</h3>
                </div>
                <div className="actions-container">
                    <div className="logout-container">
                        <span className="logout-text" onClick={logout}>Logout</span>
                    </div>
                    <div className="edit-profile-container">
                        <span className="edit-profile-text" onClick={editProfile}>Edit Profile</span>
                    </div>
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
                    onClose={toggleProfileModal}
                />
            )}
        </>
    );
};

export default ChatHeader;