import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
export default function HomeRedirect(){
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem('jwt_token');
        if(token){
            navigate('/products');
        } else{
            navigate('/login');
        }
    }, [navigate]);
    return null;
}
