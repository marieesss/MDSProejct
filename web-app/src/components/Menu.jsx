import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { NavLink} from 'react-router-dom';
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
      <div className="navigation">
      <img class ="companylogo" src={companyLogo} alt="BigCo Inc. logo"/>
<ul>
    <NavLink to="/"  className={(nav) => (nav.isActive ? "nav-active" : "")}>
        <li id ="menu">ACCUEIL</li>
    </NavLink>
    <NavLink to="/about" className={(nav) => (nav.isActive ? "nav-active" : "")}>
    <li id ="menu">A PROPOS </li>
    </NavLink>
    <NavLink to="/productf" className={(nav) => (nav.isActive ? "nav-active" : "")}>
    <li id ="menu">NOS PRODUITS  </li>
    </NavLink>

    <div className='navbar-connection'>

    <NavLink to="/cart" className={(nav) => (nav.isActive ? "nav-active" : "")}>
    <li id ="menu"><img class ="panier" src={loop} alt="BigCo Inc. logo"/></li>
    </NavLink>
      
    <NavLink to="/cart" className={(nav) => (nav.isActive ? "nav-active" : "")}>
    <li id ="menu"><img class ="panier" src={panier} alt="BigCo Inc. logo"/>{quantity}</li>
    </NavLink>
    <NavLink to="/inscription" className={(nav) => (nav.isActive ? "nav-active" : "")}>
    <li id ="menu">SE CONNECTER </li>
    </NavLink>
      </div>
    {user && 
    <div>
            <li> Mon profil</li>
            <NavLink to="/">
            <li onClick={logoutHandler}> Logout</li>
            </NavLink>
            </div>}
</ul>

</div>
      </div>
    );
};

export default Menu;