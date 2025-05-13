import { React } from 'react'
import CreatePost from '../components/CreatePost';

const CreatePostPage = () => {


    return (
        <div className='w-full sm:w-[calc(100%-250px)] sm:ml-[250px]'>
            <div className='h-[70px] border-b-1 flex items-center'>
                <h1 className='text-white ml-6'>Create Post</h1>
            </div>


            <CreatePost />
        </div>
    )
}

export default CreatePostPage