import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/users/register',
                { username: userName, password: password, email: email }
            );

            if (response.data.success) {
                navigate('/');
            }

        } catch (error) {
            console.error("Error registering user:", error);
        }
    };



    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='flex flex-col items-center'>

            <input type="text" placeholder='Username' onChange={(e) => setUserName(e.target.value)} className='bg-white w-3xs rounded-md text-center py-1 mb-1'/>
            <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} className='bg-white w-3xs rounded-md text-center py-1 mb-1'/>
            <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} className='bg-white w-3xs rounded-md text-center py-1 mb-1'/>
            <button type="submit" onClick={handleRegister} className='bg-blue-950 text-white w-[100px] rounded-md py-1 hover:bg-blue-300 hover:cursor-pointer'>Submit</button>
            </div>
        </div>
    )
}

export default RegisterPage;