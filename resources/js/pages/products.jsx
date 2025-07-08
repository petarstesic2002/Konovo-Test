import React, {useEffect} from 'react';
import ProductList from "../components/productsList.jsx";
import {useNavigate} from "react-router-dom";

export default function Products() {
    const navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem('jwt_token'))
            navigate('/login');
    }, [navigate])
    return (
        <>
            <ProductList />
        </>
    );
}
