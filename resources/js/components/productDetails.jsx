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
                //navigate('/products');
                console.log(error);
            }
        }
        fetchProduct();
    }, [id, navigate]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className="container d-flex text-center justify-center mt-5">
            <div className="row">
                <div className="col-md-5">
                    <img className="card-img-top" src={product.imgSrc} alt={product.name} />
                </div>
                <div className="col-md-7">
                    <h2>{product.name}</h2>
                    <p>Kategorija: {product.category}</p>
                    <p>Brend: {product.brand}</p>
                    <p>Cena: {product.price.toFixed(2)}</p>
                    <div>
                        <strong>Description</strong>
                        <div dangerouslySetInnerHTML={{ __html: product.description }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
