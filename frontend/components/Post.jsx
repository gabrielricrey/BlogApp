import React from 'react'
import {HandThumbUpIcon, ChatBubbleBottomCenterIcon, PaperAirplaneIcon} from '@heroicons/react/24/solid'
import Comments from './Comments';

const Post = ({post}) => {

    return (
        <li key={post._id} className='bg-blue-900 p-2 border-2 rounded-md relative'>
            <h4 className='absolute top-0 right-0 text-white'>Posted by: {post.author.username}</h4>
            <h2 className='text-white underline'>{post.title}</h2>
            <p>{post.content}</p>
            <div className='flex gap-0.5 mt-2 items-center'>
                <button className='p-0.5 border-2 rounded-md hover:border-white hover:cursor-pointer'><HandThumbUpIcon className='size-6 text-blue-500'/></button>
                <p className='text-white'>{post.likes}</p>
                <button className='p-0.5 border-2 rounded-md hover:border-white hover:cursor-pointer'><ChatBubbleBottomCenterIcon className='size-6 text-blue-500'/></button>
                <p className='text-white'>{post.comments.length}</p>
            </div>
            <Comments post={post}/>
        </li>
    )
}

export default Post