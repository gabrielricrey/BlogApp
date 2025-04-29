import React, { useState } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import axios from 'axios';

const Comments = ({ post }) => {

    const [comment, setComment] = useState("");
    console.log(post);
    const submitComment = async () => {
        const token = JSON.parse(localStorage.getItem('token'))

        if (!token) {
            console.log('No token found')
            return
        }

        try {
            const response = await axios.post(`http://localhost:3000/comments/${post._id}`, { comment }, { headers: { Authorization: `Bearer ${token}` } })
            console.log(response.data)
        } catch (error) {
            console.error("Error creating comment:", error);
        }

    }

    return (
        <div className='comments mt-2'>
            <div>
                <textarea name="" id="" className='bg-white rounded-md' onChange={(e) => setComment(e.target.value)}></textarea>
                <button onClick={submitComment}><PaperAirplaneIcon className='size-6 text-blue-500' /></button>
            </div>
            <ul className='flex flex-col gap-2'>
                {post.comments && post.comments.map(comment =>
                    <li className='rounded-md bg-blue-950 text-white p-0.5 flex justify-between'>
                        <p>{comment.content}</p>
                        <p>{comment.author.username}</p>
                    </li>)}
            </ul>
        </div>
    )
}

export default Comments