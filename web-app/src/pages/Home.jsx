import React from 'react';
import Menu from '../components/Menu';
import "../css/app.css"
import panierhome from '../assets/panierhome.png';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";



const Home = () => {
    const [products, setProducts] = useState ([]) // championSort, setChampionsSort
    useEffect(() => {
        axios.get(`http://localhost:5000/api/product`)
          .then(response => {
            const productsData = response.data.slice(0,4);
            setProducts(productsData);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

    return (
            <div>
        <header>
            <Menu/>    
        </header> 
    
    <div className="container-home">
        <div class="row m-4">
            <div class="column">
                <h1 id='home'>LIVRAISON <br/>OFFERTE</h1>
                <p id='home'> Recevez notre panier frias, direcetement chez vous <br/>ou dans l'un de nos hubs, gratuitement <br/>dès 50 euros d'achat</p>
            </div>
            <div class="column" >
                <img class ="panierhome" src={panierhome} alt="BigCo Inc. logo"/>
            </div>
        </div>
    </div>
    <div class="box-homepage-text">
        <span class="text-box-homepage">Avec nous, l'avenir sera meilleure</span> <br/>
            Découvrez nos produits de circuits courts
    </div>


    <div class="row justify-content-between">
    <div class="col-2" > Les dernières nouveautés </div>
    <div class="col-2"> Voir les derniers produits </div>

    </div>
    <div class=" row justify-content-center">
        {products.map(product =>
        
            <div class="card card-product">
                <img class="card-img-top card-img-product" src={product.img}/>
                <div class="card-body">
                    <h5 class="card-title">{product.title}</h5>
                    <p class="card-text">{product.price} euros</p>
                    <Link to={`/product/${product._id}`}>
                            <button> Ajouter au panier </button>
                    </Link>
                </div>
                </div>

        )}
    </div>

    </div>
        );
    };
    

export default Home;