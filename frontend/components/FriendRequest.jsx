import {React, useContext} from 'react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const FriendRequest = ({req}) => {

    const {loggedInUser} = useContext(UserContext);
    const navigate = useNavigate();

    const acceptRequest = async (id) => {
        console.log(id);

        if(!localStorage.getItem('token')) {
            localStorage.removeItem('token');
            navigate('/')
        }

        const token = JSON.parse(localStorage.getItem('token'));

        try {
            const response = await axios.post(`http://localhost:3000/friends/${id}/accept-request`,{},{headers: {Authorization: `Bearer ${token}`}})
            console.log(response);
        } catch (error) {
            console.log('Error:' + error.message)
        }

    }
    const denyRequest = async (id) => {
        console.log(id);
        if(!localStorage.getItem('token')) {
            localStorage.removeItem('token');
            navigate('/')
        }

        const token = JSON.parse(localStorage.getItem('token'));

        try {
            const response = await axios.post(`http://localhost:3000/friends/${id}/deny-request`,{},{headers: {Authorization: `Bearer ${token}`}})
            console.log(response);
        } catch (error) {
            console.log('Error:' + error.message)
        }
    }

    return (
        <li className="text-white py-2 px-4">
            <p>{req.username} has sent you a friend request</p><div className="flex mt-1 gap-2"><button onClick={() => acceptRequest(req._id)} className='border-2 border-black p-1 rounded-md hover:cursor-pointer hover:border-white'><CheckIcon className='size-6 text-green-400' /></button><button onClick={() => denyRequest(req._id)}  className='border-2 p-1 rounded-md hover:cursor-pointer hover:border-white border-black'><XMarkIcon className='size-6 text-red-400' /></button></div>
        </li>
    )
}

export default FriendRequest