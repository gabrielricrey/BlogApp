import { React, useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/UserContext'

import FriendRequest from './FriendRequest'

const NotificationContainer = ({show}) => {

    const [friendRequests, setFriendRequests] = useState(null)
    const { loggedInUser } = useContext(UserContext);

    useEffect(() => {
        if (loggedInUser && loggedInUser.friendRequests) {
            setFriendRequests(loggedInUser.friendRequests)
            console.log(friendRequests);
        }
    }, [loggedInUser])


    return (
        <>
        {show &&
            
            <div className='border-2 w-sm rounded-md right-2 absolute mt-2 h-72 z-3 bg-blue-800'>
            <ul>
            {friendRequests && friendRequests
                .map(req => <FriendRequest req={req}/>)}
            </ul>
            </div>
        }
        </>
    )
}

export default NotificationContainer