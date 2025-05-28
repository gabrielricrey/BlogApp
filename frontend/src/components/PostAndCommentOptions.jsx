import { React, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { PostsContext } from '../context/PostsContext';
import { toast } from 'react-hot-toast'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostAndCommentOptions = ({ setShowOptions, content }) => {


    const [showDeleteOptions, setShowDeleteOptions] = useState(false);

    const { deletePost } = useContext(PostsContext);

    const navigate = useNavigate();

    const handleDelete = async () => {
        if(!content.post) {

            let res = await deletePost(content._id);
            if (res.success) {
                setShowDeleteOptions(false);
                setShowPostOptions(false);
                toast.success('Success!')
                
            }
        } else {
            const token = JSON.parse(localStorage.getItem('token'));
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                console.log(content._id);
                const response = await axios.delete(`http://localhost:3000/comments/${content._id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log(response.data);
                setShowDeleteOptions(false);
                setShowOptions(false);
                toast.success('Comment deleted successfully');
            } catch (error) {
                console.error('Error deleting comment:', error);
                toast.error('Error deleting comment');
            }
        }
    }

    return (
        <>
            <div className='fixed inset-0 flex items-center justify-center bg-black/30 z-20'>
                {!showDeleteOptions &&
                    <div className='w-full max-w-sm rounded-md border-1 flex flex-col items-center p-2 gap-2 bg-blue-900 text-white'>
                        <button className='flex'>
                            <Link to={`/edit-content/${content._id}`} state={{ content }}>
                                <p>Edit</p>
                            </Link>
                        </button>
                        <button onClick={() => setShowDeleteOptions(true)} className='flex'>
                            <p>Delete</p>
                        </button>
                        <button onClick={() => setShowOptions(false)} className='flex'>
                            <p>Exit</p>
                        </button>
                    </div>
                }
                {showDeleteOptions &&
                    <div className='w-full max-w-sm rounded-md border-1 flex flex-col items-center p-2 gap-2 bg-blue-900 text-white'>
                        <p>Are you sure you want to delete this content?</p>
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

export default PostAndCommentOptions