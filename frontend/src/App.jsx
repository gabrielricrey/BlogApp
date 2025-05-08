import { useState, useContext } from 'react'
import './App.css'
import {Routes,Route, useNavigate} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import StartPage from '../pages/StartPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage'
import SearchPage from '../pages/SearchPage';
import NotificationContainer from '../components/NotificationContainer';
import { MagnifyingGlassIcon, UserCircleIcon, HomeIcon, BellIcon} from '@heroicons/react/24/solid';
import { UserContext } from '../context/UserContext';


function App() {

  const [showNotifications, setShowNotifications] = useState(false)

  const {setLoggedInUser} = useContext(UserContext);

  const navigate = useNavigate();

  const signOut = () => {
    if(localStorage.getItem('token')) {
      localStorage.removeItem('token');
      setLoggedInUser(null);
      navigate('/')

    }
  }


  return (
    <>
      <nav className="w-[100] bg-blue-900 flex justify-between p-2 items-center">
        <a href="" className='text-white'>BlogApp</a>
        {localStorage.getItem('token') && 
        <ul className='flex justify-between items-center gap-2'>
          <li><button className='flex items-center justify-center'><BellIcon onClick={() => setShowNotifications(prev => !prev)} className='size-6 text-white hover:cursor-pointer'/></button></li>
          <li><button className='flex items-center justify-center' onClick={() => navigate('/start')}><HomeIcon className='size-6 text-white hover:cursor-pointer'/></button></li>
          <li><button className='flex items-center justify-center' onClick={() => navigate('/profile')}><UserCircleIcon className='size-6 text-white hover:cursor-pointer'/></button></li>
          <li><button className='flex items-center justify-center' onClick={() => navigate('/search')}><MagnifyingGlassIcon className='size-6 text-white hover:cursor-pointer'/></button></li>
          <li><button onClick={signOut} className='bg-blue-950 text-white px-2 py-1 rounded-md border-2 border-black hover:cursor-pointer hover:border-white'>Sign Out</button></li>
          
        </ul>
        }
      </nav>
      <NotificationContainer show={showNotifications}/>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/start' element={<StartPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/profile/:id' element={<ProfilePage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/search' element={<SearchPage/>}/>
      </Routes>
    </>
  )
}

export default App
