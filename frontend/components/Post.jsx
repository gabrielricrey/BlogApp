import { React, useState } from 'react'
import { HandThumbUpIcon, ChatBubbleBottomCenterIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid'
import Comments from './Comments';


const Post = ({ post }) => {

    const [showComments, setShowComments] = useState(false);


    return (


        <li key={post._id} className='bg-blue-900 p-2 border-2 rounded-md relative'>
            <h4 className='absolute top-0 right-0 text-white'>Posted by: {post.author.username}</h4>
            <h2 className='text-white underline'>{post.title}</h2>
            <p>{post.content}</p>


            <div className='flex mt-2 items-center justify-between'>
                <div className="flex items-center gap-0.5">
                    <button className='p-0.5 border-2 rounded-md hover:border-white hover:cursor-pointer'><HandThumbUpIcon className='size-6 text-blue-500' /></button>
                    <p className='text-white'>{post.likes}</p>
                    <button onClick={() => setShowComments(!showComments)} className='p-0.5 border-2 rounded-md hover:border-white hover:cursor-pointer'><ChatBubbleBottomCenterIcon className='size-6 text-blue-500' /></button>
                    <p className='text-white'>{post.comments.length}</p>
                </div>
                <p className="">
                    {new Date(post.createdAt).toLocaleString('sv-SE', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </p>
            </div>
            {showComments &&
                <Comments post={post} />
            }
        </li>

    )
}

export default Post