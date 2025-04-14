import { useState } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import StartPage from '../pages/StartPage';
import RegisterPage from '../pages/RegisterPage';

function App() {


  return (
    <>
      <nav className="w-[100] bg-blue-900 flex justify-between p-2">
        <a href="" className='text-white'>BlogApp</a>
        <ul className='flex justify-between'>
          <li><a href="">A</a></li>
          <li><a href="">B</a></li>
          <li><a href="">C</a></li>
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
