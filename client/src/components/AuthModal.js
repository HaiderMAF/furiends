import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
const AuthModal = ({ setShowModal, isSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const navigate = useNavigate();

    const handleClick = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isSignUp && password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            const response = await axios.post(
                `http://localhost:8000/${isSignUp ? 'signup' : 'login'}`,
                { email, password }
            );

            setCookie('AuthToken', response.data.token);
            setCookie('UserId', response.data.userId);

            const success = response.status === 201;
            if (success && isSignUp) navigate('/onboarding');
            if (success && !isSignUp) navigate('/dashboard');
            
            window.location.reload();

        } catch (error) {
            setError('An error occurred. Please try again.');
            console.error('Authentication Error:', error);
        }
    };

    return (
        <div className="auth-modal">
            <div className="close-icon" onClick={handleClick}>ⓧ</div>
            <h2>{isSignUp ? 'Create Account' : 'Log In'}</h2>
            <p>By clicking log in, you agree to our users terms and conditions.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isSignUp && (
                    <input
                        type="password"
                        id="password-check"
                        name="password-check"
                        placeholder="Confirm Password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                )}
                <button className="secondary-button" type="submit">Submit</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <h2>The social place for your furball</h2>
        </div>
    );
};

export default AuthModal;