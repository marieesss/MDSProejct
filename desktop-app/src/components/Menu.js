import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userRedux';
import "../css/app.css";

const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const logoutHandler = (e) =>{
    e.preventDefault();
    dispatch(logout());

    }
  return (

   <ul class=" container-c background-green menu">

  <a class="navbar-brand" href="#">LOGO</a>
    
     {!user ? <li class="nav-item">
        <a class="nav-link" href="/login">Login</a>
      </li> : <div></div> }
      
      <li class="li-menu margin-right">
        <a class="nav-link" href="/">Home</a>
      </li>
      <li class="li-menu margin-right">
        <a class="nav-link" href="/order">Order</a>
      </li>
      <li class="li-menu margin-right">
        <a class="nav-link" href="/product">product</a>
      </li>
      <li class="li-menu margin-right">
        <a class="nav-link" href="/user">User</a>
      </li>
      <li class="li-menu margin-right">
        <a class="nav-link" href="/hub">Hub</a>
      </li>
      <li class="li-menu margin-right">
        <a class="nav-link" href="/fermier">Fermier</a>
      </li>
      {user && 
            <li  class="nav-item"> <div onClick={logoutHandler} class="fa fa-thin fa-right-from-bracket link" style={{color: "#ffffff;"}}/></li>
            }
    </ul>
      
  )
}

export default Menu
