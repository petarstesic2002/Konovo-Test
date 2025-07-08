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
                setProduct(res.data.data);

            } catch(error){
                navigate('/products');
            }
        }
        fetchProduct();
    }, [id, navigate]);

    if (!product) return <p className="text-center mt-3">Loading...</p>;

    return (
        <div className="container text-center mt-5">
            <div className="row">
                <div className="col-md-5">
                    <img className="card-img-top" src={product.imgSrc} alt={product.name} />
                </div>
                <div className="col-md-7">
                    <div className="display-6 mb-3">
                        {product.name}
                    </div>
                    <hr/>
                    <div>
                        <strong>Kategorija</strong>: {product.category}
                    </div>
                    {product.brand ?
                        <div>
                            <strong>Brend</strong>: {product.brand}
                        </div>
                        :
                        <></>
                    }
                    <div>
                        <strong>Cena</strong>: {product.price.toFixed(2)} RSD ({product.vat}% uračunat PDV)
                    </div>
                    {product.ean ?
                        <div>
                            <strong>EAN</strong>: {product.ean}
                        </div>
                        :
                        <></>
                    }
                    {product.stock ?
                        <div>
                            <strong>Raspoloživa količina</strong>: {product.stock}
                        </div>
                        :
                        <></>
                    }
                    <hr/>
                    {product.description ?
                        <div className="row text-center">
                            <h5 className="fw-bold">
                                Opis
                            </h5>
                            <div dangerouslySetInnerHTML={{__html: product.description}} />
                        </div>
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
