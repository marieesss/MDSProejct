import React, { useState } from 'react';
import Menu from '../components/Menu';
import Categories from '../components/Categories';
import Fermiers from '../components/Fermiers';
import "../css/app.css"


const Home = () => {
    return (
        <div>
        <Menu/>
        <div class="background_home">
            <div class="row justify-content-between container-home">
                <div class="col-lg-4 col-sm-12 title-home">
                    <div class="nouveau">
                        Nouveau
                    </div>
                    <h1>
                        Livraison Offerte
                    </h1>
                    <div class="desc-home">
                        Recevez votre panier de fruit, directement chez vous dans l'un de nos hubs, gratuitement dès 50 euros d'achat
                    </div>
                    <button class="button">
                        voir nos produits
                    </button>
                </div>
                    <div class="col-6 bg-black title-home">
                        <div class="row justify-content-center align-self-end">
                            <img class="img-home" src="https://images.unsplash.com/photo-1579113800032-c38bd7635818?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"/>
                        </div>
                    </div>
            </div>
        </div>
        </div>
    );
};

export default Home;