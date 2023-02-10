import React from 'react';
import { NavLink} from 'react-router-dom';

const Menu = () => {
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
</ul>

      </div>
    );
};

export default Menu;