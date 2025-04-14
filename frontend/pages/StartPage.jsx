import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import CreatePost from '../components/CreatePost';
import Posts from '../components/Posts';


const StartPage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      if (!token) {
        navigate('/')
      }

      try {
        await axios.get('http://localhost:3000/auth/verify', { headers: { Authorization: `Bearer ${token}` } })
      } catch (error) {
        console.log('Token not valid or expired' + error)
        localStorage.removeItem('token');
        navigate('/')
      }
    }
    verifyToken();
  }, [])

  return (
    <div>StartPage
    <Posts/>
    <CreatePost />
    </div>
  )
}

export default StartPage