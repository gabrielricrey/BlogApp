import React from 'react';
import thumbnail from '../assets/thumbnail.png';
import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import FollowOptions from '../components/FollowOptions';
import Post from '../components/Post'
import Followers from '../components/Followers';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null)
  const { id } = useParams();
  const { loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [togglePostsAndFriends, setTogglePostsAndFriends] = useState(true);

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
          navigate('/');
        }
      }
      if (id) {
        try {
          const response = await axios.get(`http://localhost:3000/api/blogpost/user/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setPosts(response.data);
        } catch (error) {
          console.log('Token är ogiltig eller har gått ut:', error);
          navigate('/');
        }
      }
    }

    getUserInfo();
  }, [id, navigate]);

  useEffect(() => {
    if (!id && loggedInUser) {
      setUser(loggedInUser);
      getMyPosts();

    }
  }, [id, loggedInUser]);

  const getMyPosts = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) {
      navigate('/');
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/api/blogpost/myposts", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if(response.data) {
        setPosts(response.data);
      }

    } catch (error) {
      console.log('Token är ogiltig eller har gått ut:', error);

    }
  }

  return (
    <div className='md:ml-[250px]'>
      <div className='h-[70px] border-b-1 flex items-center'>
        <h1 className='text-white ml-6'>Profile</h1>
      </div>
      <div className='border-0 rounded-md m-auto shrink-0 max-w-5xl'>
        <div className=' p-5 relative flex'>
          <img src={thumbnail} alt="" className='rounded-full size-50' />
          <h1 className='p-2 rounded-md absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl'>
            {user && user.username}
          </h1>

          {user && loggedInUser && user.username === loggedInUser.username && (
            <button className='p-2 border-2 bg-green-400 absolute right-5 rounded-md hover:cursor-pointer hover:border-white'>
              Edit Profile
            </button>
          )}
          {user && loggedInUser && user.username !== loggedInUser.username && (
            <FollowOptions />
          )}
        </div>

        <div className='flex justify-center bg-blue-900 p-5'>
          <div className='flex text-center gap-5'>
            <div>
              <h4 className='text-white'>{user && user.followers.length}</h4>
              <h4 className='text-white'>Followers</h4>
            </div>
            <div>
              <h4 className='text-white'>{user && user.posts.length}</h4>
              <h4 className='text-white'>Posts</h4>
            </div>
            <div>
              <h4 className='text-white'>{user && user.comments.length}</h4>
              <h4 className='text-white'>Comments</h4>
            </div>
          </div>
        </div>
        <div className='w-full flex bg-blue-900 text-white'>
            <button onClick={() => setTogglePostsAndFriends(true)} className='w-full hover:cursor-pointer p-2 border-b'>Posts</button>
            <button onClick={() => setTogglePostsAndFriends(false)} className='w-full hover:cursor-pointer p-2'>Followers</button>
        </div>
        <ul className='border-1 rounded-md mt-5'>
          {posts && togglePostsAndFriends && posts
          .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map(post => <Post post={post}/>)}
          {!togglePostsAndFriends && <Followers/>}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
