import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { NavLink} from 'react-router-dom';
import { logout } from '../redux/apiCalls';

const Menu = () => {
    const dispatch = useDispatch();
    const quantity= useSelector(state=> state.cart.quantity)
    const user = useSelector((state) => state.user.currentUser);
    
    const logoutHandler = (e) =>{
        logout(dispatch);
      }

    return (
      <div className="navigation">
<ul>
    <NavLink to="/"  className={(nav) => (nav.isActive ? "nav-active" : "")}>
        <li>Accueil</li>
    </NavLink>
    <NavLink to="/about" className={(nav) => (nav.isActive ? "nav-active" : "")}>
        <li>A propos</li>
    </NavLink>
    <NavLink to="/salut" className={(nav) => (nav.isActive ? "nav-active" : "")}>
        <li>salut</li>
    </NavLink>
    <NavLink to="/inscription" className={(nav) => (nav.isActive ? "nav-active" : "")}>
        <li>inscription</li>
    </NavLink>
    <NavLink to="/cart" className={(nav) => (nav.isActive ? "nav-active" : "")}>
        <li>Panier: {quantity}</li>
    </NavLink>
    {user && <div>
            <li> Mon profil</li>
            <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
            <li onClick={logoutHandler}> Logout</li>
            </NavLink>
            </div>}
</ul>


      </div>
    );
};

export default Menu;