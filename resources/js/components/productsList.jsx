import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import ProductsFilter from "./productsFilter.jsx";
import ProductPagination from "./productPagination.jsx";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = {};
                if (search) params.search = search;
                if (category) params.category = category;
                if (page > 0) params.page = page;

                const res = await api.get('/products', {params});
                setProducts(res.data.data.data);
                setPage(res.data.data.page);
                setTotalPages(Math.ceil(res.data.data.total / res.data.data.perPage));
            }catch(error){

            }finally {
                setLoading(false)
            }
        };
        fetchProducts();
    }, [search, category, page]);

    if(products.length == 0){
        return <h1 className="display-1">Trenutno nema proizvoda...</h1>;
    }

    return (
        <>
            <div className="container mt-2">
                <h1 className="display-1 text-center">
                    Proizvodi
                </h1>
                <ProductPagination loading={loading} page={page} setPage={setPage} lastPage={totalPages} />
                <div className="row">
                    <ProductsFilter setSearch={setSearch} setCategory={setCategory} />
                    <div className="col-md-8 row d-flex text-center align-middle">
                        {products.map(p => (
                            <div className="col-md-4 card mb-3" key={p.sifProduct}>
                                <Link to={`/products/${p.sifProduct}`}>
                                    <img className="card-img-top" src={p.imgSrc} alt={p.name}/>
                                    <span className="card-title">
                                        {p.name}
                                    </span>
                                </Link>
                                <div className="card-body">
                                    <span className="card-text text-secondary">
                                        {Number(p.price).toFixed(2)} RSD
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductList;
