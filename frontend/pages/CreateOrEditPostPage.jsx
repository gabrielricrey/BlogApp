import { React, useState } from 'react'
import CreateOrEditPost from '../components/CreateOrEditPost';

const CreateOrEditPostPage = () => {

    const [editMode,setEditMode] = useState(false);


    return (
        <div className='w-full sm:w-[calc(100%-250px)] sm:ml-[250px]'>
            <div className='h-[70px] border-b-1 flex items-center'>
                <h1 className='text-white ml-6'>{editMode? "Edit" : "Create"} Post</h1>
            </div>


            <CreateOrEditPost editMode={editMode} setEditMode={setEditMode}/>
        </div>
    )
}

export default CreateOrEditPostPage