import { useState } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import StartPage from '../pages/StartPage';
import RegisterPage from '../pages/RegisterPage';

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/start' element={<StartPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
      </Routes>
    </>
  )
}

export default App
