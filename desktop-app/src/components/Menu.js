import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userRedux';
import "../css/app.css";
import { Link } from 'react-router-dom';
import companyLogo from '../img/logo.png';


const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  // envoie l'action au réducer logout pour se déconnecter
  const logoutHandler = (e) =>{
    e.preventDefault();
    dispatch(logout());
    }
  return (

    <div class="container-fluid text-align-center">
    <nav class="navbar navbar-expand-lg">
    <div class="container-fluid text-align-center">
    <Link to="/">    <img class ="companylogo" src={companyLogo} alt="BigCo Inc. logo"/> </Link>
        <button class="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
           <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
          
            <li class="nav-item" id="menu">
            <Link class="nav-link" to="/">ACCUEIL</Link>
            </li>
    
            <li class="nav-item" id="menu">
            <Link to="/product" class="nav-link">PRODUITS</Link>
            </li>
    
            <li class="nav-item" id="menu">
            <Link to="/order" class="nav-link">COMMANDES</Link>
            </li>

            <li class="nav-item" id="menu">
            <Link to="/user" class="nav-link">USER</Link>
            </li>

            <li class="nav-item" id="menu">
            <Link to="/hub" class="nav-link">HUB</Link>
            </li>

            <li class="nav-item" id="menu">
            <Link to="/fermier" class="nav-link">FERMIER</Link>
            </li>
          </ul>
                <ul class="navbar-nav">
    
                <li onClick={logoutHandler}  class="nav-item" id="menu"> 
                <div  class="fa fa-thin fa-right-from-bracket link" style={{color: "#ffffff;"}}/>
                 </li>
    
            </ul>
          </div>
        </div>
    </nav>
    </div>
      
  )
}

export default Menu
