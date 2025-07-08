import React, {useState} from "react";
import api from '../services/api';
import {useNavigate} from 'react-router-dom';

function LoginForm(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async e =>{
        e.preventDefault();
        try{
            const res = await api.post('/login', {username, password});
            localStorage.setItem('jwt_token', res.data.data.token);
            navigate('/products');
        }catch(error){
            setError(error.response.data.message);
        }
    }
    return (
        <form className="container col-4 text-center mt-5" onSubmit={handleSubmit}>
            <div className="form-group mb-2">
                <label for="username">Korisničko ime</label>
                <input className="form-control" id="username" name="username" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Korisnično ime" required/>
            </div>
            <div className="form-group mb-2">
                <label htmlFor="username">Lozinka</label>
                <input className="form-control" id="password" name="password" type="password" value={password}
                       onChange={e => setPassword(e.target.value)} placeholder="Lozinka"/>
            </div>
            <div className="form-group mb-2">
                <button className="btn btn-primary" type="submit">Prijavi se</button>
                {error && <span className="alert alert-danger">{error}</span>}
            </div>
        </form>
    )
}

export default LoginForm;
