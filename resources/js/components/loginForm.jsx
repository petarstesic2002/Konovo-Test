import React, {useState} from "react";
import api from '../services/api';
import {useNavigate} from 'react-router-dom';

function loginForm(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async e =>{
        e.preventDefault();
        try{
            const res = await api.post('/login', {username, password});
            localStorage.setItem('jwt_token', res.data.token);
            navigate('/products');
        }catch(error){
            setError(error.message);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required/>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Log In</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    )
}

export default loginForm;
