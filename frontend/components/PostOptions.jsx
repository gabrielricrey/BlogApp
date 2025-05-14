import { React, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { PostsContext } from '../context/PostsContext';
import { toast } from 'react-hot-toast'

const PostOptions = ({ setShowPostOptions, post }) => {

    const [showDeleteOptions, setShowDeleteOptions] = useState(false);

    const { deletePost } = useContext(PostsContext);

    const handleDelete = async () => {
        let res = await deletePost(post._id);
        if (res.success) {
            setShowDeleteOptions(false);
            setShowPostOptions(false);
            toast.success('Success!')

        }
    }

    return (
        <>
            <div className='fixed inset-0 flex items-center justify-center bg-black/30 z-20'>
                {!showDeleteOptions &&
                    <div className='w-full max-w-sm rounded-md border-1 flex flex-col items-center p-2 gap-2 bg-blue-900 text-white'>
                        <button className='flex'>
                            <Link to={`/edit-post/${post._id}`} state={{ post }}>
                                <p>Edit</p>
                            </Link>
                        </button>
                        <button onClick={() => setShowDeleteOptions(true)} className='flex'>
                            <p>Delete</p>
                        </button>
                        <button onClick={() => setShowPostOptions(false)} className='flex'>
                            <p>Exit</p>
                        </button>
                    </div>
                }
                {showDeleteOptions &&
                    <div className='w-full max-w-sm rounded-md border-1 flex flex-col items-center p-2 gap-2 bg-blue-900 text-white'>
                        <p>Are you sure you want to delete this post?</p>
                        <button onClick={handleDelete} className='flex'>
                            <p>Delete</p>
                        </button>
                        <button onClick={() => setShowDeleteOptions(false)} className='flex'>
                            <p>Exit</p>
                        </button>
                    </div>}
            </div>
        </>
    )
}

export default PostOptions