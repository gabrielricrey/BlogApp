import { React, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash'
import axios from 'axios';

const SearchPage = () => {

  const [searchInput, setSearchInput] = useState("");
  const [result, setResult] = useState(null);

  const navigate = useNavigate();

  const fetchUsers = async (query) => {
    if (!query.trim()) {
      return setResult([]);
    }
    const token = JSON.parse(localStorage.getItem('token'));

    if (!token) {
      navigate('/')
      return
    }
    const users = await axios.get(`http://localhost:3000/api/users?search=${query}`, { headers: { Authorization: `Bearer ${token}` } })
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
  }, [searchInput])

  return (
    <div className='w-full sm:w-[calc(100%-250px)] sm:ml-[250px]'>
      <div className='h-[70px] border-b-1 flex items-center'>
        <h1 className='text-white ml-6'>Search</h1>
      </div>

      <div className='w-full flex flex-col justify-center items-center mt-5'>
        <input type="text" className='bg-white text-center p-2 outline-0 rounded-md w-md' onChange={(e) => setSearchInput(e.target.value)} />
        <ul className=' w-lg p-3 rounded-md mt-5'>
          {result && result.map(user => <li className='text-white hover:cursor-pointer' onClick={() => navigate(`/profile/${user._id}`)}>{user.username}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default SearchPage