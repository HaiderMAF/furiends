import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const ChatHeader = ({ user }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['UserId', 'AuthToken']);
    const navigate = useNavigate();
    
    const logout = () => {
        removeCookie('UserId');
        removeCookie('AuthToken');
        navigate('/');
    };

    return (
        <div className="chat-container-header">
            <div className="profile">
                <div className="img-container">
                    <img src={user.url} alt={'photo of ' + user.first_name}/>
                </div>
                <h3>{user.first_name}</h3>
            </div>
            <div className="logout-container">
                <i className="log-out-icon" onClick={logout}>⇦</i>
                <span className="logout-text" onClick={logout}>Logout</span>
            </div>
        </div>
    );
};

export default ChatHeader;