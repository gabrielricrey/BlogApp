import {React, useState, useEffect} from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Friends = () => {

const [friends,setFriends] = useState(null);

const navigate = useNavigate();
const {id} = useParams();

useEffect(() => {

    const getFriends = async () => {

        
        if(!localStorage.getItem('token')) {
            navigate('/')
        }
        
        const token = JSON.parse(localStorage.getItem('token'));
        let endpoint = "http://localhost:3000/friends";

        if(id)

            endpoint = `http://localhost:3000/friends/user/${id}`
        
        try {
            const response = await axios.get(endpoint,{headers: {Authorization: `Bearer ${token}`}})
            console.log(response);
            setFriends(response.data)
        } catch (error) {
            console.log('Error fetching friends:' + error.message)
        }
        
    }

    getFriends();


},[id])

  return (
    <>
        {friends && friends.map((friend,i) => <li key={i} className='w-full p-5 bg-blue-900 text-white'><Link to={`/profile/${friend._id}`}>{friend.username}</Link></li>)}
    </>
  )
}

export default Friends