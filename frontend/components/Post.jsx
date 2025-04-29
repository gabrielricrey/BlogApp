import React from 'react'
import {HandThumbUpIcon, ChatBubbleBottomCenterIcon} from '@heroicons/react/24/solid'

const Post = ({post}) => {
    console.log(post);
    return (
        <li key={post._id} className='bg-blue-900 p-2 border-2 rounded-md relative'>
            <h4 className='absolute top-0 right-0 text-white'>Posted by: {post.author.username}</h4>
            <h2 className='text-white underline'>{post.title}</h2>
            <p>{post.content}</p>
            <div className='flex gap-0.5 mt-2'>
                <button className='p-0.5 border-2 rounded-md hover:border-white hover:cursor-pointer'><HandThumbUpIcon className='size-6 text-blue-500'/></button>
                <button className='p-0.5 border-2 rounded-md hover:border-white hover:cursor-pointer'><ChatBubbleBottomCenterIcon className='size-6 text-blue-500'/></button>
            </div>
        </li>
    )
}

export default Post