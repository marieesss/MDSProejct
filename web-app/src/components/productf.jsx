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
  const [products, setProducts] = useState ([]) // championSort, setChampionsSort
  const [searchInput, setSearchInput] = useState('');
  const location = useLocation();

  
  const url= location.state?.fermierId;
 

  useEffect(() => {
    
    url ? axios.get(`http://localhost:5000/api/product?fermier=${url}`)
    .then(response => {
      console.log(response)
      const productsData = response.data;
      const productsList = Object.keys(productsData).map(key => productsData[key]);
      console.log(productsList)
      setProducts(productsList);
    })
    .catch(error => {
      console.log(error);
    })
    :
    axios.get(`http://localhost:5000/api/product`)
      .then(response => {
        console.log(response)
        const productsData = response.data;
        const productsList = Object.keys(productsData).map(key => productsData[key]);
        console.log(productsList)
        setProducts(productsList);
      })
      .catch(error => {
        console.log(error);
      });
  }, [url]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/fermier`)
      .then(response => {
        console.log(response.data)
        setFermier(response.data);
        console.log(fermier)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);



  const sort = () => {
    setProduitsFiltres(products.filter(product => product.categories.includes(document.getElementById("select").value)));
  }

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
      <div class="col-2">
      <input class="filter"
                        placeholder='Search...'
                        onChange={(e) => searchItems(e.target.value)}
                    />
        <select class="filter" name="categorie" id='select' onChange={sort}>
                  <option value="rien">Tout les produits</option>
                  <option value="legume">Légume</option>
                  <option value="fruit">Fruit</option>
              </select>



        </div>

              
          <div class="col-10">
              <div className="row justify-content-center px-5">
              {
                produitsFiltres.length > 0  // if produitsFiltres = resultat affiche moi valeurs !
                ?
                produitsFiltres.map(product => (
                  <div key={product.id} class="col-lg-4 col-md-12">
                  <div class="card" style={{width: "18rem"}}>
                  <img src={product.img} alt={product.title} class="img_product" />
                    <div class="card-body">
                    <h2 class="card-title">{product.title}</h2>
                    <p>{product.price}</p>
                      <p>{product.fermierId}</p>
                      <Link to={`/product/${product._id}`}>
                        <button> Acheter </button>
                    </Link>
                    </div>
                  </div>

                    </div>
                  ))
                :   // else championsSort = nul affiche moi tout !
                products.map(product => (
                  <div key={product.id} class="col-lg-4 col-md-12">

                  <div class="card card-product">
                  <img src={product.img} alt={product.title} class="img_product"/>
                    <div class="card-body">
                    <p class="product-card-title">{product.title}</p>
                    <p>{product.price} euros/kg</p>
                    </div>
                     
                  </div>
                  <Link to={`/product/${product._id}`}>
                            <button class="button-item mt-2 mb-2">
                            <i class="fa-solid fa-cart-shopping mx-2" style={{color: "#485E1B"}}></i>
                             Ajouter au panier </button>
                    </Link>

                    
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

