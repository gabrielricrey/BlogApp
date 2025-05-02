import {React, useState, useEffect, useCallback} from 'react'
import { useNavigate } from 'react-router-dom';
import {debounce} from 'lodash'
import axios from 'axios'; 

const SearchPage = () => {

    const [searchInput, setSearchInput] = useState("");
    const [result,setResult] = useState(null);

    const navigate = useNavigate();

    const fetchUsers = async(query) => {
      if(!query.trim()) {
        return setResult([]);
      }
      const token = JSON.parse(localStorage.getItem('token'));

      if(!token) {
        navigate('/')
        return
      }
      const users = await axios.get(`http://localhost:3000/api/users?search=${query}`,{headers: {Authorization: `Bearer ${token}`}})
      setResult(users.data);
    }

    const debouncedFetch = useCallback(
      debounce((nextValue) => {
        fetchUsers(nextValue);
      }, 400),
      []
    );


    useEffect(() => {
      debouncedFetch(searchInput)
    },[searchInput])

  return (
    <div className='flex justify-center flex-col items-center'>
        <input type="text" className='bg-white text-center p-2 outline-0 rounded-md w-md mt-5' onChange={(e) => setSearchInput(e.target.value)}/>
        <ul className='bg-blue-950 w-lg p-3 rounded-md mt-5 border-2'>
            {result && result.map(user => <li className='text-white'>{user.username}</li>)}
        </ul>
    </div>
  )
}

export default SearchPage