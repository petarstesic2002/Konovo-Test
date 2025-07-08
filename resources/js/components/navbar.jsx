import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../services/api';

export default function Navbar(){
    const navigate = useNavigate();
    const handleLogout = async () =>{
        try{
            const token = localStorage.getItem('jwt_token');
            await api.post('/logout', null, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
        }catch(error){

        }
        localStorage.removeItem('jwt_token');
        navigate('/login');
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Konovo Test App</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item me-3">
                            <Link className="dropdown-item" to="/products">
                                Proizvodi
                            </Link>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="dropdown-item" onClick={handleLogout}>
                                Izloguj se
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
