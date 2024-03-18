//Implement Leaderboard functionality on this 
import { useEffect, useState } from "react"
import TinderCard from "react-tinder-card"
import axios from "axios"
import { useCookies } from "react-cookie"
import ChatContainer from "../components/ChatContainer"

const Dashboard = () => {
    const [user, setUser] = useState(null)
    const [userMatches, setUserMatches] = useState([]);
    const [lastDirection, setLastDirection] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['user'])


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

    const getUserMatches = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user-matches');
            console.log(response.data); // Log the response data to check its structure
            setUserMatches(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getUser();
        getUserMatches();
    }, [user, userMatches]);

    console.log('userMatches', userMatches)


    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen')
    }

    return (
        <>
        {userMatches && user &&
        <div className="dashboard">
            <ChatContainer user={user}/>
            <div className="swipe-container">
                <div className="card-container">
                {userMatches.map((user) =>
                    <TinderCard 
                        className="swipe" 
                        key={user.id}
                        onSwipe={(dir) => swiped(dir, user.first_name)} 
                        onCardLeftScreen={() => outOfFrame(user.first_name)}>
                        <div style={{ backgroundImage: `url(${user.url})` }} className="card">
                            <h3>{user.first_name}</h3>
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