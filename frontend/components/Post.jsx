import { React, useState } from 'react'
import { HandThumbUpIcon, ChatBubbleBottomCenterIcon, PaperAirplaneIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import Comments from './Comments';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PostOptions from './PostOptions';


const Post = ({ post }) => {

    const [showComments, setShowComments] = useState(false);
    const [showPostOptions, setShowPostOptions] = useState(false);


    const addLike = async () => {
        if (!localStorage.getItem('token')) return;

        const token = JSON.parse(localStorage.getItem('token'));

        try {
            console.log(post);
            const response = await axios.post('http://localhost:3000/likes', { postId: post._id }, { headers: { Authorization: `Bearer ${token}` } })
            console.log(response);
        } catch (error) {
            console.log('Error adding Like')
        }
    }


    return (


        <li key={post._id} className='p-4 rounded-md relative w-full shadow-xl'>
            <button onClick={() => setShowPostOptions(!showPostOptions)} className='hover:cursor-pointer'>
                <EllipsisHorizontalIcon className='absolute top-4 right-4 z-10 text-white size-6' />
            </button>
            {showPostOptions &&
                <PostOptions setShowPostOptions={setShowPostOptions} post={post}/>
            }


            <h2 className='text-white text-2xl underline'>{post.title}</h2>
            <p className='mt-3 text-md text-white'>{post.content}</p>


            <div className='flex mt-2 items-center justify-between'>
                <div className="flex items-center gap-0.5">
                    <button onClick={addLike} className='p-0.5 border-2 rounded-md hover:border-white hover:cursor-pointer'><HandThumbUpIcon className='size-6 text-blue-500' /></button>
                    <p className='text-white'>{post.likes.length}</p>
                    <button onClick={() => setShowComments(!showComments)} className='p-0.5 border-2 rounded-md hover:border-white hover:cursor-pointer'><ChatBubbleBottomCenterIcon className='size-6 text-blue-500' /></button>
                    <p className='text-white'>{post.comments.length}</p>
                </div>
                <div className='flex gap-2'>
                    <h4 className=' text-white'><Link to={`/profile/${post.author._id}`} className='hover:text-black'>{post.author.username}</Link>
                    </h4>
                    -
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
            </div>
            {showComments &&
                <Comments post={post} />
            }
        </li>

    )
}

export default Post