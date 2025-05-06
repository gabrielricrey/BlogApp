import React from 'react';
import thumbnail from '../src/assets/thumbnail.png';
import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    async function getUserInfo() {
      const token = JSON.parse(localStorage.getItem('token'));
      if (!token) {
        navigate('/start');
        return;
      }

      if (id) {
        try {
          const endpoint = `http://localhost:3000/api/users/${id}`;
          const response = await axios.get(endpoint, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setUser(response.data);
        } catch (error) {
          console.log('Token är ogiltig eller har gått ut:', error);
          navigate('/start');
        }
      }
    }

    getUserInfo();
  }, [id, navigate]);

  useEffect(() => {
    if (!id && loggedInUser) {
      setUser(loggedInUser);
    }
  }, [id, loggedInUser]);

  if (!user) return <div className="text-center mt-10 text-white">Laddar profil...</div>;

  return (
    <div className='mt-5'>
      <div className='border-2 border-black rounded-md m-auto shrink-0 max-w-5xl'>
        <div className='bg-blue-950 p-5 relative flex'>
          <img src={thumbnail} alt="" className='rounded-full size-50' />
          <h1 className='p-2 rounded-md absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl'>
            {user.username}
          </h1>

          {user && loggedInUser && user.username === loggedInUser.username && (
            <button className='p-2 border-2 bg-green-400 absolute right-5 rounded-md hover:cursor-pointer hover:border-white'>
              Edit Profile
            </button>
          )}
          {user && loggedInUser && user.username !== loggedInUser.username && (
            <button className='p-2 border-2 bg-blue-300 absolute right-5 rounded-md hover:cursor-pointer hover:border-white'>
              Add friend
            </button>
          )}
        </div>

        <div className='flex justify-center bg-blue-900 p-5'>
          <div className='flex text-center gap-5'>
            <div>
              <h4 className='text-white'>{user.friends.length}</h4>
              <h4 className='text-white'>Friends</h4>
            </div>
            <div>
              <h4 className='text-white'>{user.posts.length}</h4>
              <h4 className='text-white'>Posts</h4>
            </div>
            <div>
              <h4 className='text-white'>{user.comments.length}</h4>
              <h4 className='text-white'>Comments</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
