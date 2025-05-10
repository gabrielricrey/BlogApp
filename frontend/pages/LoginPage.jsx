import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { PostsContext } from '../context/PostsContext';


const LoginPage = () => {

    let [userName,setUserName] = useState("");
    let [password,setPassword] = useState("");

    let navigate = useNavigate();

    const {verifyUser} = useContext(UserContext);
    const {fetchPosts} = useContext(PostsContext);
    

    useEffect(() => {
      if(localStorage.getItem('token')) {
        navigate('/start')
      }
    }, [])

    const handeLogin = async () => {

      const response = await axios.post('http://localhost:3000/login', {username: userName, password: password})
      
      if(response.data.token) {
        localStorage.setItem('token', JSON.stringify(response.data.token))
        verifyUser();
        await fetchPosts();
        navigate('/start')
      }


    }


  return (
    <div className='w-[100] h-screen flex flex-col items-center justify-center'>
        <input type="text" onChange={(e) => setUserName(e.target.value)} className='bg-white w-3xs rounded-md text-center py-1 mb-1' placeholder='username'/>
        <input type="password" onChange={(e) => setPassword(e.target.value)} className='bg-white w-3xs rounded-md text-center py-1 mb-1' placeholder='password'/>
        <button onClick={handeLogin} className='bg-blue-950 text-white w-[100px] rounded-md py-1 hover:bg-blue-300 hover:cursor-pointer'>Login</button>
        <button onClick={() => navigate('/register')}>Register</button>
    </div>
  )
}

export default LoginPage