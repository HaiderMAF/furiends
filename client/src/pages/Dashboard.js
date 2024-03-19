//Implement Leaderboard functionality on this 
import { useEffect, useState } from "react"
import TinderCard from "react-tinder-card"
import axios from "axios"
import { useCookies } from "react-cookie"
import ChatContainer from "../components/ChatContainer"

const Dashboard = () => {
    const [user, setUser] = useState(null)
    const [stackUsers, setStackUsers] = useState(null);
    const [lastDirection, setLastDirection] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const userId = cookies.UserId

    const getUser = async () => {
        const userId = cookies.UserId; // Assuming cookies is defined elsewhere
        try {
            const response = await axios.get('http://localhost:8000/user', {
                params: { userId }
            });
            setUser(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getStackUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user-matches');// Log the response data to check its structure
            setStackUsers(response.data);
            console.log(user)
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (user){
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
        if(direction === 'right') {
            updateMatches(matchedUserId)
        }
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen')
    }

    const matchedUserIds = user?.matches?.map(({ user_id }) => user_id).concat(userId);

    const filteredUsers = stackUsers?.filter(stackUser => !matchedUserIds.includes(stackUser.user_id))
    
    console.log('filtered Users', filteredUsers)
    return (
        <>
        {user &&
        <div className="dashboard">
            <ChatContainer user={user}/>
            <div className="swipe-container">
                <div className="card-container">
                {stackUsers?.map((stackUser) =>
                    <TinderCard 
                        className="swipe" 
                        key={stackUser.user_id}
                        onSwipe={(dir) => swiped(dir, stackUser.user_id)} 
                        onCardLeftScreen={() => outOfFrame(stackUser.first_name)}>
                        <div style={{ backgroundImage: `url(${stackUser.url})` }} className="card">
                            <h3>{stackUser.first_name}</h3>
                        </div>
                    </TinderCard>
                )}
                    <div className="swipe-info">
                        {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}

                    </div>
                </div>
            </div>
        </div>}
        </>
    )
}

export default Dashboard