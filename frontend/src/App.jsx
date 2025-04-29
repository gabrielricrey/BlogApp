import { useState } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import StartPage from '../pages/StartPage';
import RegisterPage from '../pages/RegisterPage';
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid';

function App() {


  return (
    <>
      <nav className="w-[100] bg-blue-900 flex justify-between p-2 items-center">
        <a href="" className='text-white'>BlogApp</a>
        <ul className='flex justify-between items-center gap-2'>
          <li><button className='flex items-center justify-center'><UserCircleIcon className='size-6 text-white hover:cursor-pointer'/></button></li>
          <li><button className='flex items-center justify-center'><MagnifyingGlassIcon className='size-6 text-white hover:cursor-pointer'/></button></li>
          <li><button className='bg-blue-950 text-white px-2 py-1 rounded-md border-2 border-black hover:cursor-pointer hover:border-white'>Sign Out</button></li>
          
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/start' element={<StartPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
      </Routes>
    </>
  )
}

export default App
