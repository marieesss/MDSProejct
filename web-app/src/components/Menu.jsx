import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink} from 'react-router-dom';

const Menu = () => {
    const quantity= useSelector(state=> state.cart.quantity)
    return (
      <div className="navigation">
<ul>
    <NavLink to="/"  className={(nav) => (nav.isActive ? "nav-active" : "")}>
        <li id ="menu">Accueil</li>
    </NavLink>
    <NavLink to="/productf" className={(nav) => (nav.isActive ? "nav-active" : "")}>
    <li id ="menu">product: </li>
    </NavLink>
    <NavLink to="/about" className={(nav) => (nav.isActive ? "nav-active" : "")}>
    <li id ="menu">A propos</li>
    </NavLink>
    <NavLink to="/inscription" className={(nav) => (nav.isActive ? "nav-active" : "")}>
    <li id ="menu">inscription</li>
    </NavLink>
    <NavLink to="/cart" className={(nav) => (nav.isActive ? "nav-active" : "")}>
    <li id ="menu">Panier: {quantity}</li>
    </NavLink>
    
</ul>

      </div>
    );
};

export default Menu;