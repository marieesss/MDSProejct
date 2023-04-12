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

    <div class="container-fluid">
    <div class="row mt-5 justify-content-between">
    
      <a href="/" class="col-6">
          <img src={require('../img/logo.png')} width={150}/>
      </a>

      <div class="col-6 row justify-content-end">
      <a  class="ml-4 col-1" href="/">Home</a>&ensp;
      <a class="ml-4 col-1" href="/order">Order</a>&ensp;
      <a class="ml-4 col-1" href="/product">Product</a>&ensp;
      <a class="ml-4 col-1" href="/user">User</a>&ensp;
      <a class="ml-4 col-1" href="/hub">Hub</a>&ensp;
      <a class="ml-4 col-1" href="/fermier">Fermier</a>&ensp;
      {user && <a onClick={logoutHandler}  class="col-1"> <div  class="fa fa-thin fa-right-from-bracket link" style={{color: "#ffffff;"}}/></a>}
</div>


  </div>
</div>
      
  )
}

export default Menu
