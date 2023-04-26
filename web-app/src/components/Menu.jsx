import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { NavLink} from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';

import { logout } from '../redux/userRedux';
import { resetCart } from '../redux/cartRedux';
import companyLogo from '../assets/logo.png';
import panier from '../assets/panier.png';
import loop from '../assets/loop.png';

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
    <div className='bandeaux'>
      Livrais offerte à parti de 50€ d'achat 
    </div>
      <div class="row justify-content-center mt-4">
      <div class="col-lg-2 col-md-12">
      <img class ="companylogo" src={companyLogo} alt="BigCo Inc. logo"/>
      </div>

      <div class="col-lg-6 col-md-12">
    <NavLink to="/">
        <li id ="menu">ACCUEIL</li>
    </NavLink>
    <Link to="/#propos">
    <li id ="menu">A PROPOS </li>
    </Link>
    <NavLink to="/productf">
    <li id ="menu">NOS PRODUITS  </li>
    </NavLink>

    <NavLink to="/fermier">
    <li id ="menu">NOS FERMIERS  </li>
    </NavLink>
    </div>

    <div class="col-lg-4 col-md-12">
    <div class="row justify-content-end align-items-center">
    <NavLink to="/cart" class="col-3 ">
    <li id ="menu"><img class ="panier" src={panier} alt="BigCo Inc. logo"/>{quantity}</li>
    </NavLink>
    {!user && 
    <NavLink to="/login" class="col-7">
    <li  id ="menu">SE CONNECTER </li>
    </NavLink> 
    }
    
   {user && 
            <NavLink to="/" class="col-5">
            <li onClick={logoutHandler} id="menu">Logout</li>
            </NavLink>
            }

    </div>
</div>
</div>
      </div>
    );
};

export default Menu;