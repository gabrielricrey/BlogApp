import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-hot-toast';



const LoginPage = () => {

    let [userName,setUserName] = useState("");
    let [password,setPassword] = useState("");

    let navigate = useNavigate();

    const {verifyUser} = useContext(UserContext);

    

    useEffect(() => {
      if(localStorage.getItem('token')) {
        navigate('/start')
      }
    }, [])

    const handleLogin = async (e) => {

      e.preventDefault();

      try{

        const response = await axios.post('http://localhost:3000/login', {username: userName, password: password})
        
        if(response.data.token) {
          localStorage.setItem('token', JSON.stringify(response.data.token))
          verifyUser();
          toast.success('Login successful!');
          navigate('/start')
        }
      } catch(error) {
        toast.error('Invalid username or password!');
      }
        

    }


  return (
    <div className='w-[100] h-screen flex flex-col items-center justify-center'>
      <form onSubmit={handleLogin} className='flex flex-col items-center'>
        <input type="text" onChange={(e) => setUserName(e.target.value)} className='bg-white w-3xs rounded-md text-center py-1 mb-1' placeholder='username'/>
        <input type="password" onChange={(e) => setPassword(e.target.value)} className='bg-white w-3xs rounded-md text-center py-1 mb-1' placeholder='password'/>
        <button type="submit" className='bg-blue-950 text-white w-[100px] rounded-md py-1 hover:bg-blue-300 hover:cursor-pointer'>Login</button>
      </form>
        <button onClick={() => navigate('/register')}>Register</button>
    </div>
  )
}

export default LoginPage