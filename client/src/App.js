import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import OnBoarding from './pages/OnBoarding'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { useCookies } from 'react-cookie'
import Leaderboard from './components/Leaderboard'
import EditProfile from './pages/EditProfile'

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  
  const authToken = cookies.AuthToken
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home/>}/>
        {authToken && <Route path={"/dashboard"} element={<Dashboard/>}/>}
        {authToken && <Route path={"/onboarding"} element={<OnBoarding/>}/>}
        {authToken && <Route path={"/leaderboard"} element={<Leaderboard/>}/>}
        {authToken && <Route path={"/edit-profile"} element={<EditProfile/>}/>}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
