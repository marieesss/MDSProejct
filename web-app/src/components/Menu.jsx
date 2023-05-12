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

    <div class="container-fluid text-align-center">
<nav class="navbar navbar-expand-lg ">
<div class="container-fluid text-align-center">
<Link to="/">    <img class ="companylogo" src={companyLogo} alt="BigCo Inc. logo"/> </Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    
       <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
      
        <li class="nav-item" id="menu">
        <Link class="nav-link" to="/#propos">A PROPOS</Link>
        </li>

        <li class="nav-item" id="menu">
        <Link to="/productf" class="nav-link">NOS PRODUITS</Link>
        </li>

        <li class="nav-item" id="menu">
        <Link to="/fermier" class="nav-link">NOS PRODUCTEURS</Link>
        </li>
      </ul>
            <ul class="navbar-nav">
         <li class="nav-item" id ="menu">
         <Link to="/cart" class="nav-link"><img class ="panier" src={panier} alt="BigCo Inc. logo"/>{quantity}</Link>
        </li>

        {!user && 
        <li  id ="menu" class="nav-item">
    <Link to="/login" class="nav-link">
    SE CONNECTER 
    </Link> </li>
    }
    
   {user && 
            
            <li onClick={logoutHandler} id="menu" class="nav-item"><Link to="/" class="nav-link">Logout </Link></li>
           
            }

        </ul>
      </div>
    </div>
</nav>
</div>
      </div>
    );
};

export default Menu;