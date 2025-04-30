import React from 'react'
import thumbnail from '../src/assets/thumbnail.png'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ProfilePage = () => {

  const [me, setMe] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function getUserInfo() {
      const token = JSON.parse(localStorage.getItem('token'))
      if (!token) {
        navigate('/start');
        return;
      }
  
      try {
        const response = await axios.get('http://localhost:3000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMe(response.data)

      } catch (error) {
        console.log('Token är ogiltig eller har gått ut:', error);
        navigate('/start');
      }
    }
  
    getUserInfo();
  }, []);
  


  return (
    <div className='mt-5'>

      <div className='border-2 border-black rounded-md m-auto shrink-0 max-w-5xl'>

        <div className=' bg-blue-950 p-5 relative flex'>
            <img src={thumbnail} alt="" className='rounded-full size-50' />
            <h1 className='p-2 rounded-md absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl'>{me && me.username}</h1>
            <button className='p-2 border-2 bg-green-400 absolute right-5 rounded-md hover:cursor-pointer hover:border-white'>Edit Profile</button>
        </div>

        <div className='flex justify-center bg-blue-900 p-5'>
          <div className='flex text-center gap-5'>
            <div className=''>
              <h4 className='text-white'>{me && me.friends.length}</h4>
              <h4 className='text-white'>Friends</h4>
            </div>
            <div>
              <h4 className='text-white'>{me&& me.posts.length}</h4>
              <h4 className='text-white'>Posts</h4>
            </div>
            <div>
              <h4 className='text-white'>{me&& me.comments.length}</h4>
              <h4 className='text-white'>Comments</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage