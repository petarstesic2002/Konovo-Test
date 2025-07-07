import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../services/api';

export default function Navbar(){
    const navigate = useNavigate();
    const handleLogout = async () =>{
        try{
            const token = localStorage.getItem('jwt_token');
            await api.post('/logout', null, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
        }catch(error){

        }
        localStorage.removeItem('jwt_token');
        navigate('/login');
    }
    return (
        <nav>
            <Link to="/products">Products</Link>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    )
}
