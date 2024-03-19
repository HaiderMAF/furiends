import { useCookies } from 'react-cookie';

const ChatHeader = ({ user }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['UserId', 'AuthToken']);
    
    const logout = () => {
        removeCookie('UserId');
        removeCookie('AuthToken');
        // Handle logout logic here (e.g., redirecting to the login page)
    };

    return (
        <div className="chat-container-header">
            <div className="profile">
                <div className="img-container">
                    <img src={user.url} alt={'photo of ' + user.first_name}/>
                </div>
                <h3>{user.first_name}</h3>
            </div>
            <i className="log-out-icon" onClick={logout}>⇦</i>
        </div>
    );
};

export default ChatHeader;