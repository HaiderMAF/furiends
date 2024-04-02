import React from 'react';

const MatchModal = ({ user, matchedUser, onClose }) => {
    return (
        <div className="match-modal-overlay" onClick={onClose}>
            <div className="match-modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>It's a Match!</h2>
                <div className="match-profiles">
                    <div className="match-profile">
                        <img src={user?.url} alt="Your Profile" />
                    </div>
                    <div className="match-profile">
                        <img src={matchedUser?.url} alt="Matched User Profile" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchModal;