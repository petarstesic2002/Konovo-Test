import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`);
                console.log(res.data.data);
                setProduct(res.data.data);

            } catch(error){
                navigate('/products');
            }
        }
        fetchProduct();
    }, [id, navigate]);

    if (!product) return <p>Loading...</p>;

    return (
        <div>
            <img src={product.imgSrc} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Category: {product.category}</p>
            <p>Brand: {product.brand}</p>
            <p>Price: {product.price.toFixed(2)}</p>
            <div>
                <strong>Description</strong>
                <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
        </div>
    );
}

export default ProductDetails;
