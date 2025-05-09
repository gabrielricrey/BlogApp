import { React, useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import axios from 'axios';


const FriendOptions = () => {

    const [friends, setFriends] = useState(false);
    const [pendingRequest,setPendingRequest] = useState(false);

    const { loggedInUser } = useContext(UserContext);
    const { id } = useParams();

    useEffect(() => {
        if (loggedInUser.friends.includes(id)) setFriends(true);
        if (loggedInUser.sentRequests.includes(id)) setPendingRequest(true);
    }, [])

    const addFriend = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            navigate('/start');
            return;
        }

        try {
            console.log(id);
            console.log(token);
            const response = await axios.post(`http://localhost:3000/friends/${id}/send-request/`, {}, { headers: { Authorization: `Bearer ${token}` } })
            console.log(response)
        } catch (error) {
            console.log(error)
        }

    }

    const removeFriend = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            navigate('/start');
            return;
        }

        try {
            console.log(id);
            console.log(token);
            const response = await axios.delete(`http://localhost:3000/friends/${id}/remove-friend/`, { headers: { Authorization: `Bearer ${token}` } })
            console.log(response)
        } catch (error) {
            console.log(error)
        }

    }

    const cancelRequest = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            navigate('/start');
            return;
        }

        try {
            console.log(id);
            console.log(token);
            const response = await axios.delete(`http://localhost:3000/friends/${id}/cancel-request/`, { headers: { Authorization: `Bearer ${token}` } })
            console.log(response)
            setPendingRequest(false);
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <>
            {!friends && !pendingRequest &&

                <button className='p-2 border-2 bg-blue-300 absolute right-5 rounded-md hover:cursor-pointer hover:border-white' onClick={addFriend}>
                    Add friend
                </button>
            }
            {friends &&

                <button className='p-2 border-2 bg-red-300 absolute right-5 rounded-md hover:cursor-pointer hover:border-white' onClick={removeFriend}>
                    Remove friend
                </button>
            }
            {pendingRequest &&

                <button className='p-2 border-2 bg-red-300 absolute right-5 rounded-md hover:cursor-pointer hover:border-white' onClick={cancelRequest}>
                    Cancel request
                </button>
            }
        </>
    )
}

export default FriendOptions