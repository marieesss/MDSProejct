import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userRedux';

const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const logoutHandler = (e) =>{
    e.preventDefault();
    dispatch(logout());

    }
  return (

    
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="/">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/inscription">Inscription</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/login">Login</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/order">Order</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/product">product</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/user">User</a>
      </li>
      {user && 
            <li  class="nav-item"> <a class="nav-link"onClick={logoutHandler}> Logout </a></li>
            }
    </ul>
  </div>
</nav>
      
    </div>
  )
}

export default Menu
