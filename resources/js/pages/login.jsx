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
        <div className="mt-5">
            <h2 className="display-2 text-center mt-5">Konovo App - Prijava</h2>
            <LoginForm />
        </div>
    );
}
