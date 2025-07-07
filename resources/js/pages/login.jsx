import React, {useEffect} from 'react';
import LoginForm from '../components/loginForm';
import {useNavigate} from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    useEffect(()=>{
       if(localStorage.getItem('jwt_token')){
           navigate('/products');
       }
    }, [navigate]);
    return (
        <div>
            <h2>Log In</h2>
            <LoginForm />
        </div>
    );
}
