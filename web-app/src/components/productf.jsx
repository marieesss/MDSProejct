import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import panierhome from '../assets/panierhome.png';
import Footer from './Footer';

import "../css/app.css"


import axios from 'axios';
import Menu from './Menu';

function ProductListTest() {
  const [produitsFiltres, setProduitsFiltres] = useState([]);
  const [fermier, setFermier] = useState([]);
  const [products, setProducts] = useState ([]) 
  const [searchInput, setSearchInput] = useState('');
  const location = useLocation();

  //récupération de l'url de l'API
  const URL = process.env.REACT_APP_API_URL;
  //récupération du state envoyé par la page fermier
  const url= location.state?.fermierId;
 

  useEffect(() => {
    // si j'ai l'id du fermier, méthode pour récupérer les produits en fonction du fermier
    url ? axios.get(`https://${URL}/api/product?fermier=${url}`)
    .then(response => {
      const productsData = response.data;
      const productsList = Object.keys(productsData).map(key => productsData[key]);
      setProducts(productsList);
    })
    .catch(error => {
      console.log("erreur");
    })
    :
    //sinon méthode pour récupérer tout les produits
    axios.get(`https://${URL}/api/product`)
      .then(response => {
        const productsData = response.data;
        const productsList = Object.keys(productsData).map(key => productsData[key]);
        setProducts(productsList);
      })
      .catch(error => {
        console.log("erreur");
      });
  }, [url]);

  //méthode pour récupérer tout les fermiers
  useEffect(() => {
    axios.get(`https://${URL}/api/fermier`)
      .then(response => {
        setFermier(response.data);
      })
      .catch(error => {
        console.log("erreur");
      });
  }, []);


//méthode pour filtrer en fonction de la valeur du select
  const sort = () => {
    setProduitsFiltres(products.filter(product => product.categories.includes(document.getElementById("select").value)));
  }


  //méthode pour filtrer en fonction de la valeur dans la barre de recherche
const searchItems = (searchValue) => {
  setSearchInput(searchValue)
  if (searchInput !== '') {
      const filteredData = products.filter((item) => {
          return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setProduitsFiltres(filteredData)
  }
  else{
    setProduitsFiltres(products)
  }
}



  return (
    <div class="container-fluid p-0 overflow-hidden">
      <Menu/>

      <div className="container-home">
        <div class="row m-4">
            <div class="column col-lg-6 col-md-12">
                <h1 id='home'>Faites le plein de fraîcheur !</h1>
                <p id='home'> Nos producteurs se chargent de préparer votre panier personnalisé avec soin, en respectant vos choix et en privilégiant toujours les produits de saison. </p>
            </div>
            <div class="column col-lg-6 col-md-12" >
                <img class ="panierhome" src={panierhome} alt="BigCo Inc. logo"/>
            </div>
        </div>
    </div>

    <div class="row ligne-verte-espace">
                <div class="col-2">
                </div>
                <div class="col-8 ligne-verte">
                </div>
                <div class="col-2">
                </div>

            </div>

    <div class="row justify-content-center">
    <div class="col-lg-2 col-md-12 px-5 mb-4">
    <h5 class="text-center" style={{color:"#485E1B"}}> Filtres</h5>
  <div class="row justify-content-center">
    <div class="col-12">
      <div class="search-wrapper">
        <input class="filter col-10" placeholder='Recherchez' onChange={(e) => searchItems(e.target.value)} />
        <i class="fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-12">
      <select class="filter mt-4" name="categorie" id="select" onChange={sort}>
        <option value="rien">Tous les produits</option>
        <option value="legume">Légume</option>
        <option value="fruit">Fruit</option>
      </select>
    </div>
  </div>
</div>


              
          <div class="col-lg-10 col-md-12">
              <div className="row justify-content-center px-5">
              {
                produitsFiltres.length > 0  // if produitsFiltres = resultat affiche moi valeurs !
                ?
                produitsFiltres.map(product => (
                  <div key={product.id} class="col-lg-4 col-md-12">

                  <div class="card card-product">
                  <img src={product.img} alt={product.title} class="img_product"/>
                    <div class="card-body">
                    <p class="product-card-title">{product.title}</p>
                    <p>{product.price} €/kg</p>
                    </div>
                     
                  </div>
                  {product.size < 1  ? 

                      <button class="button-item-nostock mt-2 mb-5">
                      <i class="fa-regular fa-face-frown fa-xl mx-2" style={{color: "#ff0000"}}/>
                              produit épuisé </button>

                      :

                      <Link to={`/product/${product._id}`}>
                              <button class="button-item mt-2 mb-5">
                              <i class="fa-solid fa-cart-shopping mx-2" style={{color: "#485E1B"}}></i>
                              Ajouter au panier </button>
                      </Link>

}

                    
                  </div>
                  ))
                : 
                products.map(product => (
                  <div key={product.id} class="col-lg-4 col-md-12">

                  <div class="card card-product">
                  <img src={product.img} alt={product.title} class="img_product"/>
                    <div class="card-body">
                    <p class="product-card-title">{product.title}</p>
                    <p>{product.price} €/kg</p>
                    </div>
                     
                  </div>
                  {product.size < 1  ? 

                    <button class="button-item-nostock mt-2 mb-2">
                    <i class="fa-regular fa-face-frown fa-xl mx-2" style={{color: "#ff0000"}}/>
                            produit épuisé </button>

                   :
                   
                   <Link to={`/product/${product._id}`}>
                            <button class="button-item mt-2 mb-5">
                            <i class="fa-solid fa-cart-shopping mx-2" style={{color: "#485E1B"}}></i>
                             Ajouter au panier </button>
                    </Link>
                   
                   }
                  

                    
                  </div>
                ))
                
              }
              </div>
              </div>
              </div>
              <Footer/>
    </div>
  );
}


export default ProductListTest;

