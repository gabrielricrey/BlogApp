import { React, useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/UserContext'

import FollowRequest from './FollowRequest'


const NotificationContainer = ({show}) => {

    const [followRequests, setFollowRequests] = useState(null)
    const { loggedInUser } = useContext(UserContext);

    useEffect(() => {
        if (loggedInUser && loggedInUser.followRequests) {
            setFollowRequests(loggedInUser.followRequests)
            console.log(followRequests);
        }
    }, [loggedInUser])


    return (
        <>
        {show &&
            
            <div className='border-2 w-sm rounded-md right-2 absolute mt-2 h-72 z-3 bg-blue-800'>
            <ul>
            {followRequests && followRequests
                .map(req => <FollowRequest req={req}/>)
            }
            {followRequests.length == 0 && <li>No New Notifications!</li>}
            </ul>
            </div>
        }
        </>
    )
}

export default NotificationContainer