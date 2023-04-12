import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Order from './pages/Order';
import Product from './pages/Product';
import User from './pages/User';
import { useSelector } from 'react-redux';
import Hub from './pages/Hub';
import Fermier from './pages/Fermier';


function App() {
  const user = useSelector((state)=> state.user.currentUser)
  return (
    <Routes>
      {user ? <Route path="/" element={<Home/>} /> : <Route path="/" element={<Login/>}/>}
      <Route path="*" element={<Home/>} />
      {user ? <Route path="/login" element={<Login/>} />: <Route path="/login" element={<Login/>}/>}
      {user ? <Route path="/order" element={<Order/>} />: <Route path="/order" element={<Login/>}/>}
      {user ? <Route path="/product" element={<Product/>} />: <Route path="/product" element={<Login/>}/>}
      {user ? <Route path="/user" element={<User/>} />: <Route path="/user" element={<Login/>}/>}
      {user ? <Route path="/hub" element={<Hub/>} />: <Route path="/user" element={<Login/>}/>}
      {user ? <Route path="/fermier" element={<Fermier/>} />: <Route path="/fermier" element={<Login/>}/>}
    </Routes>
  );
}

export default App;
