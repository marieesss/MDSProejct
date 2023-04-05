import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { NavLink} from 'react-router-dom';
import { logout } from '../redux/userRedux';
import { resetCart } from '../redux/cartRedux';
import './menu.css';

const Menu = () => {
    const dispatch = useDispatch();
    const quantity= useSelector(state=> state.cart.quantity)
    const user = useSelector((state) => state.user.currentUser);
    
    const logoutHandler = (e) =>{
      e.preventDefault();
      dispatch(logout());
      dispatch(resetCart())
      }

    return (
      <div>
   <nav class="navbar navbar-expand-lg navbar-light bg-success ">
   <div class="d-flex flex-row">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
  
      <div class ="nav-item item-menu"> 
      
    <NavLink to="/"  class="nav-link">
        <li id ="menu">Accueil</li>
    </NavLink>
    </div>
    <div class ="nav-item item-menu"> 
    <NavLink to="/productf" class="nav-link">
    <li id ="menu">Produits </li>
    </NavLink>
    </div>
   
    <div class ="nav-item item-menu"> 
    <NavLink to="/inscription" class="nav-link">
    <li id ="menu">Inscription</li>
    </NavLink>
    </div>
    <div class ="nav-item item-menu"> 
    <NavLink to="/cart" class="nav-link">
    <li id ="menu">Panier: {quantity}</li>
    </NavLink>
    </div>
    {user && 
    <div>    
          <div class ="nav-item item-menu"> 
            <NavLink to="/" class=" nav-link">
            <li onClick={logoutHandler}> Logout</li>
            </NavLink>
            </div>
            </div>}
            
    </div>
  </div>
  </div>
</nav>


      


</div>


    );
};

export default Menu;