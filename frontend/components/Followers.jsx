import {React, useState, useEffect} from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Followers = () => {

const [followers,setFollowers] = useState(null);

const navigate = useNavigate();
const {id} = useParams();

useEffect(() => {

    const getFollowers = async () => {

        
        if(!localStorage.getItem('token')) {
            navigate('/')
        }
        
        const token = JSON.parse(localStorage.getItem('token'));
        let endpoint = "http://localhost:3000/followers";

        if(id)

            endpoint = `http://localhost:3000/followers/user/${id}`
        
        try {
            const response = await axios.get(endpoint,{headers: {Authorization: `Bearer ${token}`}})
            console.log(response);
            setFollowers(response.data)
        } catch (error) {
            console.log('Error fetching followers:' + error.message)
        }
        
    }

    getFollowers();


},[id])

  return (
    <>
        {followers && followers.map((follower,i) => <li key={i} className='w-full p-5 bg-blue-900 text-white'><Link to={`/profile/${follower._id}`}>{follower.username}</Link></li>)}
    </>
  )
}

export default Followers;