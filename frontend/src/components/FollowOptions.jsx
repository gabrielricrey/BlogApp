import { React, useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import axios from 'axios';


const FollowOptions = () => {

    const [follows, setFollows] = useState(false);
    const [pendingRequest,setPendingRequest] = useState(false);

    const { loggedInUser } = useContext(UserContext);
    const { id } = useParams();

    useEffect(() => {
        if (loggedInUser.following.includes(id)) setFollows(true);
        if (loggedInUser.sentRequests.includes(id)) setPendingRequest(true);
    }, [])

    const handleFollow = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            navigate('/start');
            return;
        }

        try {
            console.log(id);
            console.log(token);
            const response = await axios.post(`http://localhost:3000/followers/${id}/follow/`, {}, { headers: { Authorization: `Bearer ${token}` } })
            console.log(response)
            if(response.data.message.includes("request")) {
                setPendingRequest(true);
            }
        } catch (error) {
            console.log(error)
        }

    }

    const handleUnfollow = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            navigate('/start');
            return;
        }

        try {
            console.log(id);
            console.log(token);
            const response = await axios.delete(`http://localhost:3000/followers/${id}/unfollow/`, { headers: { Authorization: `Bearer ${token}` } })
            console.log(response)
            setFriends(false)
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
            const response = await axios.delete(`http://localhost:3000/followers/${id}/cancel-request/`, { headers: { Authorization: `Bearer ${token}` } })
            console.log(response)
            setPendingRequest(false);
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <>
            {!follows && !pendingRequest &&

                <button className='p-2 border-2 bg-blue-300 absolute right-5 rounded-md hover:cursor-pointer hover:border-white' onClick={handleFollow}>
                    Follow
                </button>
            }
            {follows &&

                <button className='p-2 border-2 bg-red-300 absolute right-5 rounded-md hover:cursor-pointer hover:border-white' onClick={handleUnfollow}>
                    Unfollow
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

export default FollowOptions;