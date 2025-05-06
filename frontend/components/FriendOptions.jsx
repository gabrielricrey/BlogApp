import {React, useState, useEffect, useContext} from 'react'
import { useNavigate , useParams} from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import axios from 'axios';


const FriendOptions = () => {

    const [friends,setFriends] = useState(false);

    const {loggedInUser} = useContext(UserContext);
    const {id} = useParams();

    const addFriend = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
          navigate('/start');
          return;
        }

        try{
            console.log(id);
            console.log(token);
            const response = await axios.post(`http://localhost:3000/friends/${id}/send-request/`, {},{headers: { Authorization: `Bearer ${token}`}})
            console.log(response)
        } catch(error) {
            console.log(error)
        }
            
    }


    return (
        <button className='p-2 border-2 bg-blue-300 absolute right-5 rounded-md hover:cursor-pointer hover:border-white' onClick={addFriend}>
            Add friend
        </button>
    )
}

export default FriendOptions