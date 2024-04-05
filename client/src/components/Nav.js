import logo from '../images/logo-no-background.png'
import logoColor from '../images/logo-color.png'

const Nav = ({ authToken, minimal,  setShowModal, showModal, setIsSignUp}) => {

    const handleClick = () => {
        setShowModal(true)
        setIsSignUp(false)
    }
    
    return (
        <nav>
            {!authToken && !minimal && <button
                className="nav-button"
                onClick={handleClick}
                disabled= {showModal}
            >Login</button>}
        </nav>
    )
}

export default Nav;