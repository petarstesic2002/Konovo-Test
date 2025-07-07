import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            const params = {};
            if (search) params.search = search;
            if (category) params.category = category;

            const res = await api.get('/products', { params });
            setProducts(res.data.data);
        };
        fetchProducts();
    }, [search, category]);

    return (
        <>
            <input placeholder="Search..." onChange={e => setSearch(e.target.value)} />
            <input placeholder="Filter by category..." onChange={e => setCategory(e.target.value)} />
            <ul>
                {products.map(p => (
                    <li key={p.sifProduct}>
                        <Link to={`/products/${p.sifProduct}`}>
                            <img src={p.imgSrc} alt={p.name}/>
                            {p.name} - {Number(p.price).toFixed(2)} RSD
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ProductList;
