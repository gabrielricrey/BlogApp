import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useContext } from 'react';
import { PostsContext } from '../context/PostsContext';

const CreatePost = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const { addPost } = useContext(PostsContext)

    
  return (
    <div>
        <h3>Create Post</h3>
        <input type="text" placeholder='Title' onChange={(e) => setTitle(e.target.value)}/>
        <textarea placeholder='Content' onChange={(e) => setContent(e.target.value)}></textarea>
        <button type='submit' onClick={() => addPost({title,content})}>Submit</button>
    </div>
  )
}

export default CreatePost