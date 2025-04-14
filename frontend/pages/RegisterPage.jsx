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
        <div>
            <h3>RegisterPage</h3>
            <input type="text" placeholder='Username' onChange={(e) => setUserName(e.target.value)} />
            <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <button type='submit' onClick={handleRegister}>Submit</button>
        </div>
    )
}

export default RegisterPage;