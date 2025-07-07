import React from 'react';
import productList from '../components/productList';
import { useNavigate } from 'react-router-dom';

export default function products() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwt_token');
        navigate('/login');
    };

    return (
        <>
            <button onClick={handleLogout}>Odjavi se</button>
            <ProductList />
        </>
    );
}
