import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

function productList() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            const params = {};
            if (search) params.search = search;
            if (category) params.category = category;

            const res = await api.get('/products', { params });
            setProducts(res.data);
        };
        fetchProducts();
    }, [search, category]);

    return (
        <>
            <input placeholder="Pretraga..." onChange={e => setSearch(e.target.value)} />
            <input placeholder="Filter po kategoriji..." onChange={e => setCategory(e.target.value)} />
            <ul>
                {products.map(p => (
                    <li key={p.id}>
                        <Link to={`/products/${p.id}`}>{p.name} - {p.price.toFixed(2)}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default productList;
