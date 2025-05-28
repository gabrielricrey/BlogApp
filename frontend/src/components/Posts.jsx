import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { PostsContext } from '../context/PostsContext'
import Post from './Post'

const Posts = () => {

    const { posts, loading } = useContext(PostsContext)
    

  return (
      <ul className='flex flex-col gap-2 w-3xl'>
        {posts && posts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((post) => (
          <Post post={post} />
          
        ))}
      </ul>

  )
}

export default Posts