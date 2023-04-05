import React from 'react';
import { Routes, Route } from 'react-router-dom';


import Home from './pages/Home';
import './App.style.css';
import Inscription from './pages/Inscription';
import Cart from './pages/Cart';
import Login from './pages/Login';
import ProductListTest from './components/productf';
import Product from './pages/Product';
import { useSelector } from 'react-redux';
import Success from './pages/Success';



const App = () => {
  const user = useSelector((state)=> state.user.currentUser)
  return ( 
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="*" element={<Home/>} />
      <Route path="/inscription" element={<Inscription/>} />
      
      {user ? <Route path="/cart" element={<Cart/>} /> : <Route path="/cart" element={<Login/>}/>}
      <Route path="/login" element={<Login/>} />
      <Route path="/productf" element={<ProductListTest/>} />
      <Route path="/product/:id" element={<Product/>} />
      {user ? <Route path="/success" element={<Success/>} /> : <Route path="/success" element={<Login/>}/>}
      

  
  
    </Routes>
 

  
  );
};

export default App;