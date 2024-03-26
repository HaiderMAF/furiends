import Chat from "./Chat";
import ChatInput from "./ChatInput";
import ProfileDisplay from "./ProfileDisplay";
import axios from "axios";
import { useEffect, useState } from "react";

const ChatDisplay = ({ user, clickedUser }) => {
    const [usersMessages, setUsersMessages] = useState(null);
    const [clickedUsersMessages, setClickedUsersMessages] = useState(null);
    const userId = user?.user_id;
    const clickedUserId = clickedUser?.user_id;

    const getUsersMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/messages', {
                params: { userId: userId, correspondingUserId: clickedUserId }
            })
            setUsersMessages(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getClickedUsersMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/messages', {
                params: { userId: clickedUserId, correspondingUserId: userId }
            })
            setClickedUsersMessages(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (userId && clickedUserId) {
            getUsersMessages();
            getClickedUsersMessages();
            const interval = setInterval(getClickedUsersMessages, 3000);
            return () => clearInterval(interval); 
        }
    }, [userId, clickedUserId]);

    const messages = []

    usersMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = user?.first_name
        formattedMessage['img'] = user?.url
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message.timestamp
        messages.push(formattedMessage)
    })

    clickedUsersMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = clickedUser?.first_name
        formattedMessage['img'] = clickedUser?.url
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message.timestamp
        messages.push(formattedMessage)
    })

    const descendingOrderMessages = messages.sort((a, b) => a.timestamp.localeCompare(b.timestamp))
    const clickedUserName = clickedUser?.first_name
    const clickedUserImg = clickedUser?.url
    const clickedUserDOB = `${clickedUser?.dob_year}-${clickedUser?.dob_month}-${clickedUser?.dob_day}`
    const clickedUserGender = clickedUser?.gender
    const clickedUserBreed = `Location: ${user.city}, ${user.country}`
    const clickedUserLocation = clickedUser?.location
    const clickedUserBio = clickedUser?.bio
    return (
        <>
            <Chat descendingOrderMessages={descendingOrderMessages} user={user} clickedUser={clickedUser} clickedUserImg={clickedUserImg}/>
            <ChatInput
                user={user}
                clickedUser={clickedUser}
                getUsersMessages={getUsersMessages}
                getClickedUsersMessages={getClickedUsersMessages}
            />
        </>
    )
}
export default ChatDisplay;