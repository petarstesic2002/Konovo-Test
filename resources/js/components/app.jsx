import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/login';
import Products from '../pages/products';
import ProductDetails from '../components/productDetails';
import ProtectedRoute from '../components/protectedRoute';
import Navbar from "./navbar";
import HomeRedirect from "./homeRedirect";
import Footer from "./footer.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomeRedirect />} />
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={
                    <>
                        <Navbar />
                        <Routes>
                            <Route path="/products" element={
                                <ProtectedRoute>
                                    <Products />
                                </ProtectedRoute>
                            }/>
                            <Route path="/products/:id" element={
                                <ProtectedRoute>
                                    <ProductDetails />
                                </ProtectedRoute>
                            } />
                        </Routes>
                        <Footer />
                    </>
                }/>
            </Routes>
        </Router>
    );
}

export default App;
