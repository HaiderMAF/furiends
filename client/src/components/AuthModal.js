import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const AuthModal = ({setShowModal, isSignUp}) => {
    /*setShowModal must be called into AuthModal to display 
    Create Form on this component*/

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)

    let navigate = useNavigate()
    console.log(email, password, confirmPassword)

    // const isSignUp = true

    const handleClick = () => {
        setShowModal(false)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (isSignUp && (password !== confirmPassword)) {
                setError('Please make sure passwords match')
                return
            }
            console.log('posting', email, password)
            const repsonse = await axios.post('http://localhost:8000/signup', { email, password })

            const success = repsonse.status === 201

            if (success) navigate('/onboarding')
        
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="auth-modal">
            <div className="close-icon"onClick={handleClick}>ⓧ</div>
            <h2>{isSignUp ? 'Create Account' : 'Log In'}</h2>
            <p>By clicking log in, you agree to our users terms and conditions.</p>
            <form onSubmit={handleSubmit}>
                <input 
                type="email"
                id="email"
                name="email"
                placeholder="email"
                required={true}
                onChange={(e) => setEmail(e.target.value)} 
                />
                 <input 
                type="password"
                id="password"
                name="password"
                placeholder="password"
                required={true}
                onChange={(e) => setPassword(e.target.value)} 
                />
                {isSignUp && <input 
                type="password"
                id="password-check"
                name="password-check"
                placeholder="confirm password"
                required={true}
                onChange={(e) => setConfirmPassword(e.target.value)} 
                />}
                <button className="secondary-button" type="submit">SUBMIT</button>
                <p>{error}</p>
            </form>
            <h2>The place for your furball</h2>
        </div>
    )
}

export default AuthModal;