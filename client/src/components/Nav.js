import logo from '../images/logo-no-background.png'
import logoColor from '../images/logo-color.png'

const Nav = ({ authToken, minimal,  setShowModal, showModal, setIsSignUp}) => {

    const handleClick = () => {
        setShowModal(true)
        setIsSignUp(false)
    }
    
    return (
        <nav>
            <div className="logo-container">
                <img className="logo-container" src={minimal ? logoColor : logo} alt='logo' />
            </div>
            {/*Show Login If only not authenticated and not logged in in AND Disable Button When
            Modal is Shown */}
            {!authToken && !minimal && <button
                className="nav-button"
                onClick={handleClick}
                disabled= {showModal}
            >Login</button>}
        </nav>
    )
}

export default Nav;