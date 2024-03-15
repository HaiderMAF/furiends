import Nav from '../components/Nav'
import AuthModal from '../components/AuthModal'
import { useState } from 'react'
//import { useNavigate } from 'react-router-dom'

const Home = () => {

    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)

    const authToken = false
    //const navigate = useNavigate()

    const handleClick = () => {
        console.log('clicked')
        setShowModal(true)
        setIsSignUp(true)
        
    }
    return (
        //JSX needs to be wrapped
        <div className="overlay">
            <Nav minimal={false} 
            authToken={authToken} 
            setShowModal={setShowModal} 
            showModal= {showModal} 
            setIsSignUp={setIsSignUp}/>
            <div className="home">

                <h1 className="primary-title">Meet Your Fur-iends</h1>

                <button className="primary-button" onClick={handleClick}>
                    {authToken ? 'Signout' : 'Create Account'}
                </button>

                {showModal && (
                    <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
                )}
            </div>
        </div>
    )
}
export default Home;