import React from 'react';
import Menu from '../components/Menu';
import "../css/app.css"
import panierhome from '../assets/panierhome.png';
import legumes_homepage from '../assets/legumes_homepage.jpg';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';




const Home = () => {
    const [products, setProducts] = useState ([]) 
    const [fermier, setFermier] = useState ([]) 
    const [fermierId, setFermierId] = useState ("") 
    const navigate = useNavigate();
    const URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`http://${URL}:5000/api/product`)
          .then(response => {
            const productsData = response.data.slice(0,4);
            setProducts(productsData);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

      useEffect(() => {
        axios.get(`http://${URL}:5000/api/fermier`)
          .then(response => {
            const productsData = response.data.slice(0,4);
            setFermier(productsData);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

      const handleClick=(id)=>{
        setFermierId(id)
      }

      useEffect(() => {
        if (fermierId) {
          console.log(fermierId);
          navigate('/productf', {state : {fermierId: fermierId}});
        }
      }, [fermierId]);


    return (
            <div class="container-fluid p-0 overflow-hidden">
        <header>
            <Menu/>    
        </header> 
    
    <div className="container-home">
        <div class="row m-4">
            <div class="column col-lg-6 col-md-12">
                <h1 id='home'>LIVRAISON <br/>OFFERTE</h1>
                <p id='home'> Recevez notre panier frais, direcetement chez vous <br/>ou dans l'un de nos hubs, gratuitement <br/>dès 50 euros d'achat</p>
            </div>
            <div class="column col-lg-6 col-md-12" >
                <img class ="panierhome" src={panierhome} alt="BigCo Inc. logo"/>
            </div>
        </div>
    </div>
    <div class="box-homepage-text" style={{marginTop:"150px"}}>
        <span class="text-box-homepage">Avec nous, l'avenir sera meilleure</span> <br/>
            Découvrez nos produits de circuits courts
    </div>


    <div class="row justify-content-between options-carroussel">
    <div class=" col-3" > Les dernières nouveautés </div>
    <Link to={`/product`} class="col-3" >
    <div> Voir les derniers produits </div>
    </Link>

    </div>
    
    <div class=" row justify-content-center">
        {products.map(product =>

        <div class="card-product mb-5">
        
            <div class="card card-product">
                <img class="card-img-top card-img-product" src={product.img}/>
                <div class="card-body">
                    <h5 class="card-title">{product.title}</h5>
                    <p class="card-text">{product.price} euros</p>
                   
                </div>
             </div> 
             <Link to={`/product/${product._id}`}>

                            <button class="button-item mt-2 mb-2">
                            <i class="fa-solid fa-cart-shopping mx-2    " style={{color: "#485E1B"}}></i>
                             Ajouter au panier </button>
                    </Link>

            </div>

        )}
    </div>
    <div class=" row d-flex flex-wrap container-homepage-text" id="propos">
        <div class="box-homepage-text2 col-lg-6 col-md-12">
            <span class="Josefin fs-1">Des produits frais, issus d’une agriculture responsable</span> <br/>
            Ici, la qualité, la proximité et la personnalisation sont nos maîtres mots pour vous offrir une expérience unique. Une solution innovante pour soutenir les producteurs locaux et consommer des produits frais et de saison.

        </div>
        <div class="box-homepage-imgs2 col-lg-6 col-md-12">
            <img src={legumes_homepage} class="legume_img"/>

        </div>
    </div>

    <div class="box-homepage-text">
        <span class="text-box-homepage">Rencontrez nos producteurs</span> <br/>
            Tous engagé pour un avenir plus sain
    </div>

    <div class="row justify-content-between mt-5">
    <div class="col-2" > Nos fermiers stars </div>
    <Link to={`/fermier`} class="col-2" >
    <div> Voir tout les fermiers </div>
    </Link>

    </div>
    <div class=" row justify-content-center">
        {fermier.map(fermier =>
        <div class="card-product mb-5">
            <div class="card card-product">
                <img class="card-img-top card-img-product" src={fermier.img}/>
                <div class="card-body">
                    <h5 class="card-title">{fermier.name}</h5>
                    <p class="card-text">{fermier.desc}</p>
                   
                    
                </div>
                </div>
                 <button class="button-item" onClick={() => handleClick(fermier._id)}>Produits</button>
                </div>

        )}
    </div>
    <Footer/>


    </div>
        );
    };
    

export default Home;