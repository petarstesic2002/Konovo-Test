import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

function productDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(() => navigate('/products'));
    }, [id]);

    if (!product) return <p>Učitavanje...</p>;

    return (
        <div>
            <h2>{product.name}</h2>
            <p>Kategorija: {product.category}</p>
            <p>Cena: {product.price.toFixed(2)}</p>
            <p>Opis: {product.description}</p>
        </div>
    );
}

export default productDetails;
