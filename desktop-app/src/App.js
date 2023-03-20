import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Order from './pages/Order';
import Product from './pages/Product';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="*" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/order" element={<Order/>} />
      <Route path="/product" element={<Product/>} />
    </Routes>
  );
}

export default App;