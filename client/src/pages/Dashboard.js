//Implement Leaderboard functionality on this 
import { useState } from "react"
import TinderCard from "react-tinder-card"
import ChatContainer from "../components/ChatContainer"

const Dashboard = () => {
    const characters = [
        {
            name: 'Kilo',
            url: 'https://i.pinimg.com/736x/32/60/fb/3260fb808fb2206f28452d40fd6b46ce.jpg'
        },
        {
            name: 'Paris',
            url: 'https://i.pinimg.com/originals/c9/e1/d1/c9e1d1c0f37670e0f23fb4f505465674.jpg'
        },
        {
            name: 'Milo',
            url: 'https://i.pinimg.com/736x/5c/c7/ed/5cc7edbcd2a50dd527682817b92c92f6.jpg'
        },
        {
            name: 'Luna',
            url: 'https://pbs.twimg.com/profile_images/1474115605053726725/Uzm0VdjJ_400x400.jpg'
        },
        {
            name: 'Bella',
            url: 'https://pbs.twimg.com/media/FES1D3HaUAE6Oox.jpg'
        },
        {
            name: 'Charlie',
            url: 'https://i.pinimg.com/236x/25/e9/9c/25e99c3e250c29cfa9fb7adf4e0b9ab1.jpg'
        },
        {
            name: 'Lucy',
            url: 'https://i.pinimg.com/236x/b1/1a/63/b11a63167636582178c1383af5d98d62.jpg'
        }
    ]
    const [lastDirection, setLastDirection] = useState()

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen')
    }

    return (
        <div className="dashboard">
            <ChatContainer/>
            <div className="swipe-container">
                <div className="card-container">
                    {characters.map((character) =>
                        <TinderCard 
                        className="swipe" 
                        key={character.name} 
                        onSwipe={(dir) => swiped(dir, character.name)} 
                        onCardLeftScreen={() => outOfFrame(character.name)}>
                            <div style={{ backgroundImage: `url(${character.url})` }} className="card">
                                <h3>{character.name}</h3>
                            </div>
                        </TinderCard>
                    )}
                    <div className="swipe-info">
                        {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard