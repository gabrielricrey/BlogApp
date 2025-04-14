import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {

    let [userName,setUserName] = useState("");
    let [password,setPassword] = useState("");

    let navigate = useNavigate();

    const handeLogin = async () => {

      const response = await axios.post('http://localhost:3000/login', {username: userName, password: password})
      
      if(response.data.token) {
        localStorage.setItem('token', JSON.stringify(response.data.token))
        navigate('/start')
      }


    }


  return (
    <div>
        <h3>LoginPage</h3>
        <input type="text" onChange={(e) => setUserName(e.target.value)}/>
        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={handeLogin}>Login</button>
        <button onClick={() => navigate('/register')}>Register</button>
    </div>
  )
}

export default LoginPage