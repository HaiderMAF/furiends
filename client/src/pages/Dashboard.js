import { useEffect, useState } from "react"
import TinderCard from "react-tinder-card"
import axios from "axios"
import { useCookies } from "react-cookie"
import ChatContainer from "../components/ChatContainer"
import dislike from "../images/dislikepaw.png"
import like from "../images/likepaw.png"
import ProfileDisplay from "../components/ProfileDisplay"
import MatchModal from "../components/MatchModal"

const Dashboard = () => {
    const [user, setUser] = useState(null)
    const [stackUsers, setStackUsers] = useState(null);
    const [lastDirection, setLastDirection] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const [hasPotentialFriends, setHasPotentialFriends] = useState(true);
    const [swipedUsers, setSwipedUsers] = useState([]);
    const [matchedUser, setMatchedUser] = useState(null);
    const [showMatchAnimation, setShowMatchAnimation] = useState(false);

    const userId = cookies.UserId
    const [showProfile, setShowProfile] = useState(false);
    const [clickedUser, setClickedUser] = useState(null);

    const handleClickProfile = (user) => {
        setClickedUser(user);
        setShowProfile(!showProfile);
    };

    const handleSwipeRight = (matchedUserId) => {
        setMatchedUser(matchedUserId);
        setShowMatchAnimation(true);
        console.log("Swipe right triggered");
    };

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user', {
                params: { userId }
            });
            setUser(response.data);

        } catch (err) {
            console.error('Error fetching user data:', err);
        }
    };

    const getStackUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user-matches');
            setStackUsers(response.data);
        } catch (err) {
            console.error('Error fetching stack users:', err);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (user) {
            getStackUsers();
        }
    }, [user]);

    const updateMatches = async (matchedUserId) => {
        try {
            await axios.put('http://localhost:8000/addmatch', {
                userId,
                matchedUserId
            })
            getUser()
        } catch (err) {
            console.log(err)
        }
    }

    const swiped = (direction, matchedUserId) => {
        if (direction === 'right') {
            updateMatches(matchedUserId);
            handleSwipeRight(matchedUserId);
        }
        setLastDirection(direction);
        setSwipedUsers(prevSwipedUsers => [...prevSwipedUsers, matchedUserId]); // Add swiped user to the list
    };

    const outOfFrame = (name) => {
        console.log(name + ' left the screen')
    }

    const matchedUserIds = user?.matches.map(({ user_id }) => user_id).concat(userId);

    const filteredUsers = stackUsers?.filter(stackUser =>
        !matchedUserIds.includes(stackUser.user_id) &&
        !swipedUsers.includes(stackUser.user_id)); // Exclude swiped users from potential matches

    useEffect(() => {
        setHasPotentialFriends(filteredUsers && filteredUsers.length > 0);
        console.log(hasPotentialFriends);
    }, [filteredUsers]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMatchAnimation(false);
        }, 5000); // Set the animation duration (5 seconds)
        return () => clearTimeout(timer);
    }, [showMatchAnimation]);

    return (
        <>
            {user &&
                <div className="dashboard">
                    <ChatContainer user={user} />
                    <div className="swipe-container">
                        <div className="card-container">
                            {hasPotentialFriends ? (
                                filteredUsers.map((stackUser) => (
                                    <TinderCard
                                        className="swipe"
                                        key={stackUser.user_id}
                                        onSwipe={(dir) => swiped(dir, stackUser.user_id)}
                                        onCardLeftScreen={() => outOfFrame(stackUser.first_name)}
                                    >
                                        <div
                                            style={{ backgroundImage: `url(${stackUser.url})` }}
                                            className="card"
                                            onClick={() => handleClickProfile(stackUser)}
                                        >
                                            <h3>{stackUser.first_name}</h3>
                                        </div>
                                    </TinderCard>
                                ))
                            ) : (
                                <div className="no-more-users-message">
                                    No more potential friends available. Check back later!
                                </div>
                            )}
                            {lastDirection === 'right' && (
                                <img
                                    src={like}
                                    alt="like"
                                    className={`swipe-icon like-fade-in`}
                                />
                            )}
                            {lastDirection === 'left' && (
                                <img
                                    src={dislike}
                                    alt="dislike"
                                    className={`swipe-icon dislike-fade-in`}
                                />
                            )}
                        </div>
                    </div>
                </div>
            }
            {showProfile && (
                <ProfileDisplay
                    clickedUser={clickedUser}
                    clickedUserName={clickedUser?.first_name}
                    clickedUserDOB={clickedUser?.dob}
                    clickedUserBreed={clickedUser?.breed}
                    clickedUserCountry={clickedUser?.country}
                    clickedUserBio={clickedUser?.bio}
                    onSwipeRight={handleSwipeRight}
                />
            )}
            {showMatchAnimation && matchedUser && (
                <MatchModal
                    user={user}
                    matchedUser={stackUsers.find(user => user.user_id === matchedUser)}
                    onClose={() => setShowMatchAnimation(false)}
                />
            )}
        </>
    );
}

export default Dashboard;