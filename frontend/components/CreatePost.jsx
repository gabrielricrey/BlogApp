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
      <div className='flex flex-col items-center'>
        <input type="text" placeholder='Title' onChange={(e) => setTitle(e.target.value)} className='bg-white rounded-md p-2 mt-2 w-100'/>
        <textarea placeholder='Content' onChange={(e) => setContent(e.target.value)} className='bg-white rounded-md p-2 m-2 w-100'></textarea>
        <button type='submit' onClick={() => addPost({ title, content })} className='bg-blue-950 text-white w-[100px] rounded-md py-1 hover:bg-blue-300 hover:cursor-pointer'>Submit</button>
      </div>
    </div>
  )
}

export default CreatePost