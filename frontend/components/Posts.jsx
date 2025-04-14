import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { PostsContext } from '../context/PostsContext'

const Posts = () => {

    const { posts, loading } = useContext(PostsContext)
    

  return (
    <div>Posts
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Posts