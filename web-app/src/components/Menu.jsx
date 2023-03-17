import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { NavLink} from 'react-router-dom';
import { logout } from '../redux/userRedux';
import { resetCart } from '../redux/cartRedux';

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
    {user && 
    <div>
            <li> Mon profil</li>
            <NavLink to="/">
            <li onClick={logoutHandler}> Logout</li>
            </NavLink>
            </div>}
</ul>


      </div>
    );
};

export default Menu;