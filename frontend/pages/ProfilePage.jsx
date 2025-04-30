import React from 'react'
import thumbnail from '../public/thumbnail.png'

const ProfilePage = () => {
  return (
    <div className='mt-5'>

      <div className='border-2 border-black rounded-md m-auto shrink-0 max-w-5xl'>
        <div className='flex bg-blue-950 p-5'>
          <div>
            <img src={thumbnail} alt="" className='rounded-full size-60' />
          </div>
          <div className='flex flex-col justify-center items-center text-white'>
            <h4>Name:</h4>
            <h4>Username:</h4>
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='bg-blue-900 flex'>
            <div className=''>
              <h4>Friends:</h4>
            </div>
            <div>
              <h4>Posts:</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage