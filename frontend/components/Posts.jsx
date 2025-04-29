import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { PostsContext } from '../context/PostsContext'
import Post from './Post'

const Posts = () => {

    const { posts, loading } = useContext(PostsContext)
    

  return (
      <ul className='flex flex-col gap-1 w-100'>
        {posts.map((post) => (
          <Post post={post} />
          
        ))}
      </ul>

  )
}

export default Posts