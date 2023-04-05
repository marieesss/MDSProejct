import React from 'react';
import Menu from '../components/Menu';
import "../css/app.css"
import panierhome from '../assets/panierhome.png';


const Home = () => {
    return (
            <div>
        <header>
            <Menu/>    
        </header> 
    
    <div className="container-home">
    <div class="row">
    <div class="column">
    <h1 id='home'>LIVRAISON <br/>OFFERTE</h1>
    <p id='home'> Recevez notre panier frias, direcetement chez vous <br/>ou dans l'un de nos hubs, gratuitement <br/>dès 50 euros d'achat</p>
    </div>
    <div class="column" >
    <img class ="panierhome" src={panierhome} alt="BigCo Inc. logo"/>
    </div>
    </div>
    </div>
    </div>
        );
    };
    

export default Home;