import React, { useState } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import axios from 'axios';

const Comments = ({ post }) => {

    const [comment, setComment] = useState("");

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
            <div className='w-full flex justify-between gap-2 mb-3'>
                <textarea name="" id="" className='bg-transparent border-0 border-b-2 resize-none focus:outline-none p-0 leading-tight w-full' onChange={(e) => setComment(e.target.value)}></textarea>
                <button onClick={submitComment} className='p-0.5 border-2 rounded-md hover:border-white hover:cursor-pointer '><PaperAirplaneIcon className='size-6 text-blue-500' /></button>
            </div>
            <ul className='flex flex-col gap-2'>
                {post.comments && post.comments.map(comment =>
                    <li className='rounded-md bg-blue-950 text-white py-1 px-2'>
                        <div className='flex justify-between'>

                            <p>{comment.content}</p>
                            <p>{comment.author.username}</p>
                        </div>
                        <p className="text-right text-sm text-gray-400">
                            {new Date(comment.createdAt).toLocaleString('sv-SE', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>

                    </li>)}
            </ul>
        </div>
    )
}

export default Comments