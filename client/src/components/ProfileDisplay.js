import { useState } from 'react';
import paw from '../images/pawprint.png';
import pin from '../images/pin-icon.png';
import heartIcon from '../images/heart-icon.png';
const ProfileDisplay = ({ clickedUser, clickedUserImg, clickedUserName, clickedUserDOB, clickedUserGender, clickedUserBreed, clickedUserLocation, clickedUserBio, onSwipeRight }) => {
    const [showModal, setShowModal] = useState(true); // Initialize showModal with false
    const closeModal = () => {
        setShowModal(false);
    };

    const calculateAge = (dob) => {
        dob = `${clickedUser?.dob_year}-${clickedUser?.dob_month}-${clickedUser?.dob_day}`
        const birthDate = new Date(dob);
        
        // Get the current date
        const currentDate = new Date();
        
        // Calculate the difference in milliseconds between the two dates
        let ageDiff = currentDate.getTime() - birthDate.getTime();
        
        // Convert the age difference from milliseconds to years
        let age = Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25));
        
        return age;
    };

    const handleSwipeRight = () => {
        onSwipeRight();
    };

    clickedUserLocation = `${clickedUser?.city}, ${clickedUser?.country}`;
    return (
        <>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <div className="userprofile">
                            <img className="clickedUrl" src={clickedUser.url} alt={clickedUserName + "'s Profile Picture"}/>
                            <div className="profile-details">
                                <b><h3>{clickedUserName}, {calculateAge(clickedUserDOB)}</h3></b><br></br>
                                <p><img className="profile-paw" src={paw} alt="paw" />Breed: {clickedUserBreed}</p>
                                <p><img className="profile-pin" src={pin} alt="pin" />Location: {clickedUserLocation}</p>

                                <h3>About Me</h3>
                                <p>{clickedUserBio}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProfileDisplay;