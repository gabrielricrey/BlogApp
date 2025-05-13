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
    <div className='w-full sm:w-[calc(100%-250px)] sm:ml-[250px]'>
      <div className='h-[70px] border-b-1 flex items-center'>
        <h1 className='text-white ml-6'>Home</h1>
      </div>
    <Posts/>
    </div>
  )
}

export default StartPage