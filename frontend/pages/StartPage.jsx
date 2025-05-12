import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import CreatePost from '../components/CreatePost';
import Posts from '../components/Posts';
import {UserContext} from '../context/UserContext'
import { PostsContext } from '../context/PostsContext';


const StartPage = () => {

  const navigate = useNavigate();
  const {loggedInUser} = useContext(UserContext)

  const {fetchPosts} = useContext(PostsContext);

  useEffect(() => {
    if(!localStorage.getItem('token')) {
      navigate('/')
    }

    fetchPosts();
  }, [])

  return (
    <div className='w-full flex flex-col justify-center items-center mt-5'>
    <Posts/>
    </div>
  )
}

export default StartPage