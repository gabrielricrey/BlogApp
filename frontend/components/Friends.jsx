import {React, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Friends = () => {

const [friends,setFriends] = useState(null);

const navigate = useNavigate();

useEffect(() => {

    const getFriends = async () => {

        
        if(!localStorage.getItem('token')) {
            navigate('/')
        }
        
        const token = JSON.parse(localStorage.getItem('token'));
        
        try {
            const response = await axios.get('http://localhost:3000/friends',{headers: {Authorization: `Bearer ${token}`}})
            console.log(response);
            setFriends(response.data)
        } catch (error) {
            console.log('Error fetching friends:' + error.message)
        }
        
    }

    getFriends();


},[])

  return (
    <>
        {friends && friends.map((friend,i) => <li key={i}>{friend.username}</li>)}
    </>
  )
}

export default Friends