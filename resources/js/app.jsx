import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import ProductDetails from './components/ProductDetails';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/products" element={
                    <ProtectedRoute>
                        <Products />
                    </ProtectedRoute>
                } />
                <Route path="/products/:id" element={
                    <ProtectedRoute>
                        <ProductDetails />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
