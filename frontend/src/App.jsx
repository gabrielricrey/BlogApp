import { useState, useContext } from 'react'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import StartPage from './pages/StartPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage'
import SearchPage from './pages/SearchPage';
import NotificationContainer from './components/NotificationContainer';
import { MagnifyingGlassIcon, UserCircleIcon, HomeIcon, BellIcon, PlusIcon } from '@heroicons/react/24/solid';
import { UserContext } from './context/UserContext';
import CreateOrEditPostPage from './pages/CreateOrEditPostPage';
import { Toaster } from 'react-hot-toast';


function App() {

  const [showNotifications, setShowNotifications] = useState(false)


  const { setLoggedInUser } = useContext(UserContext);

  const navigate = useNavigate();

  const signOut = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      setLoggedInUser(null);
      navigate('/')

    }
  }


  return (
    <>
    <Toaster position="top-center" />
    {localStorage.getItem('token') &&
      <nav className="w-full sm:w-[250px] sm:border-r-1 bg-blue-900 flex sm:flex-col p-2 items-center fixed sm:top-0 sm:left-0 bottom-0 justify-around sm:justify-start h-[60px] sm:h-screen">

        <a href="" className='text-white hidden sm:inline mt-2'>BlogApp</a>
        
          <ul className="w-full sm:ml-5 flex flex-row justify-around sm:flex-col items-center sm:items-start gap-4 mt-0 sm:mt-8 text-white">

            <li className='order-1 sm:order-none'>
              <button className='flex items-center justify-center hover:cursor-pointer gap-2' onClick={() => navigate('/start')}>
                <HomeIcon className='size-7' />
                <p className="hidden md:inline">Home</p>
              </button>
            </li>
            <li className='order-2 sm:order-none'>
              <button className='flex items-center justify-center hover:cursor-pointer gap-2' onClick={() => navigate('/search')}>
                <MagnifyingGlassIcon className='size-7 ' />
                <p className="hidden md:inline">Search</p>
              </button>
            </li>
            <li className='order-4 sm:order-none'>
              <button onClick={() => setShowNotifications(prev => !prev)} className='flex items-center justify-center hover:cursor-pointer gap-2'>
                <BellIcon className='size-7' />
                <p className="hidden md:inline">Notifications</p>
              </button>
            </li>
            <li className='order-3 sm:order-none'>
              <button onClick={() => navigate('/create-post')} className='flex items-center justify-center hover:cursor-pointer hover:border-white gap-2'>
                <PlusIcon className='size-7 ' />
                <p className="hidden md:inline">Create</p>
              </button>
            </li>
            <li className='order-5 sm:order-none'>
              <button className='flex items-center justify-center hover:cursor-pointer gap-2' onClick={() => navigate('/profile')}>
                <UserCircleIcon className='size-7' />
                <p className="hidden md:inline">Profile</p>
              </button>
            </li>

          </ul>


        <button onClick={signOut} className='hidden sm:inline bg-blue-950 text-white px-2 py-1 rounded-md border-2 border-black hover:cursor-pointer hover:border-white fixed bottom-4'>Sign Out</button>
      </nav>
        }
      <NotificationContainer show={showNotifications} />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/start' element={<StartPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/profile/:id' element={<ProfilePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/create-post' element={<CreateOrEditPostPage />} />
        <Route path='/edit-post/:id' element={<CreateOrEditPostPage />} />
      </Routes>
    </>
  )
}

export default App
