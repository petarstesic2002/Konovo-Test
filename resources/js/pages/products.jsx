import React from 'react';
import ProductList from '../components/productsList';
import { useNavigate } from 'react-router-dom';

export default function Products() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwt_token');
        navigate('/login');
    };

    return (
        <>
            <ProductList />
        </>
    );
}
