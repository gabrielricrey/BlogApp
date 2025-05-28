import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useContext } from 'react';
import { PostsContext } from '../context/PostsContext';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';


const CreateOrEditPost = ({editMode,setEditMode}) => {

  const location = useLocation();
  const postToEdit = location.state?.post

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  

  const { addPost, editPost } = useContext(PostsContext)

  useEffect(() => {
    if(postToEdit) {
      setEditMode(true);
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
      console.log(postToEdit);
    }
  },[postToEdit])

  const handleSubmit = async () => {
    let res;
    if(editMode) {
      res = await editPost({title,content, id: postToEdit._id})
    } else {
      res = await addPost({ title, content })
    }
    console.log(res);
    if(res.success) {
      setTitle("");
      setContent("");
      setEditMode(false);
      toast.success('Success!')
    }

  }


  return (
    <>
    <div>
      <div className='flex flex-col items-center'>
        <input type="text" placeholder='Title' onChange={(e) => setTitle(e.target.value)} value={title} className='bg-white rounded-md p-2 mt-2 w-100'/>
        <textarea placeholder='Content' onChange={(e) => setContent(e.target.value)} value={content} className='bg-white rounded-md p-2 m-2 w-100'></textarea>
        <button type='submit' onClick={handleSubmit} className='bg-blue-950 text-white w-[100px] rounded-md py-1 hover:bg-blue-300 hover:cursor-pointer'>Submit</button>
      </div>
    </div>
    </>
  )
}

export default CreateOrEditPost