import React from 'react';
import { Routes, Route } from 'react-router-dom';


import Home from './pages/Home';
import Salut from './pages/Salut';
import './App.style.css';
import Inscription from './pages/Inscription';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import { useSelector } from 'react-redux';




const App = () => {
  const user = useSelector((state)=> state.user.currentUser)
  return ( 
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="*" element={<Home/>} />
      <Route path="/salut" element={<Salut/>} />
      <Route path="/inscription" element={<Inscription/>} />
      <Route path="/products/:categorie?" element={<ProductList/>} />
      <Route path="/product/:id" element={<Product/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/login" element={<Login/>} />
  
    </Routes>
 

  
  );
};

export default App;