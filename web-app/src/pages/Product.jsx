import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { publicRequest } from "../requestMethods";
import Menu from '../components/Menu';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';


const Product = () => {
  const location = useLocation();
  const [Product, setProduct]=  useState({});
  const [ProductCategorie, setProductCategorie]=  useState([]);
  const [Fermier, setFermier]=  useState({});
  const [FermierId, setFermierId]=  useState("");
  const [categorie, setCategorie]=  useState("");
  const [msg, setMsg]=  useState("");
  const [size, setSize]=  useState();
  const [quantity, setQuantity]=  useState(1);
  const [id, setId]=  useState(1);

  const dispatch = useDispatch();
  const URL = process.env.REACT_APP_API_URL;


  //récupération de l'id du produit dans l'url
  useEffect(()=>{
    // je veux récupérer la deuxième partie de l'url séparé par un /
    setId(location.pathname.split('/')[2]);
    window.scrollTo(0, 0)
}, [location.pathname])


//récupération du produit
  useEffect(()=>{
      const getProduct = async ()=> {
        try{
          const res = await axios.get(`https://${URL}/api/product/find/`+ id);
          setProduct(res.data)
          setCategorie(res.data.categories.toString())
          setFermierId(res.data.fermierId)
          setSize(res.data.size)
        }catch(err){
            console.log("erreur")
        }
      };
      getProduct();
     
    
      
  }, [id])




  // récupération des quatres derniers produits de la même catégorie
  useEffect(()=>{
    const getProductCategorie = async ()=> {
      try{
        const res = await axios.get(`https://${URL}/api/product?category=${categorie}` );
        setProductCategorie(res.data.slice(0,4))
      }catch(err){
        console.log("erreur")
      }
    };
    getProductCategorie();
}, [categorie])


// récupération des informations du fermier du produit
  useEffect(()=>{
    const getFermier = async ()=> {
      try{
        const res = await axios.get(`https://${URL}/api/fermier/find/${FermierId}` );
        setFermier(res.data)
      }catch(err){
        console.log("erreur")
      }
    };
    getFermier(); 
}, [FermierId])


// méthode pour gérer la quantité
  const handleQuantity = (type) => {
    // baisser la qauntité
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
      setMsg("")
      //augmenter la quantité
    } else {
      if (quantity < size) {
        setQuantity(quantity + 1);
        //si le produit n'a pas assez de stock pour autant de quantité
      }else{
        setMsg(`Nous n'avons que ${quantity} kilo(s) restant`)
      }
    }
  };

    // envoie l'action au réducer addProduct pour ajouter un produit au panier
  const handleClick = () => {
    dispatch(
    addProduct({...Product, quantity })
    )
  }
  return (
    <div class="container-fluid p-0 overflow-hidden">
     <div >

              <Menu/>
      <div class="row justify-content-center" style={{marginTop:"100px"}}>
      <div class="col-lg-6 col-md-12">
        <div class="row justify-content-center">
      <img src={Product.img} class="img-product" alt={Product.title} />
      </div>
      </div>
      <div class="col-lg-6 col-md-12 mt-5">
      <div class="column">
        <p class="title-product">{Product.title}</p>
        <p class="title-product-fermier">{Fermier.name}</p>
      <p class="title-product-price">{Product.price} €/kg</p>
      <p>{Product.desc}</p>
      <div class="row row-product-quantity">
      <div class="col-lg-6 col-md-12">
      <div class="row">
        <button class="col-2 product-quantity" onClick={()=>handleQuantity("dec")}>-</button>
        <div class="col-2 product-quantity-number">{quantity}</div>
         <button class="col-2 product-quantity" onClick={()=>handleQuantity("inc")}>+</button>
      
      </div>
      {msg ? 
      <div class="row justify-content-center errMsg">
        {msg}
      </div> : null}
      </div>
      <div class="col-lg-6 col-md-12">
      <button class="button-item" onClick={()=>handleClick()}>
        Ajouter au panier
      </button>
      </div>
      
      </div>
     
      </div>
      </div>
      
      </div>

      <center><h1 class="title-product-fermier-2 mb-4"> Rencontrez le producteur</h1></center>
      <div class="row justify-content-center mb-4">
        <div class="col-lg-6 col-md-12 p-5">
        <div class="row justify-content-center align-items-center">
         <h2 class="col-10">{Fermier.name}</h2>
         </div>
         <div class="row justify-content-center align-items-center">
         <p class="col-10">{Fermier.desc}</p>
         </div>
      
        </div>
        <div class="col-lg-6 col-md-12 align-self-center justify-content-center row">
        <img src={Fermier.img} class="product-img-fermier" alt={Fermier.name}/>
        </div>

      </div>

      <center><h1 class="title-product-fermier-2 mb-4">Produits similaires</h1></center>
       
    <div class=" row justify-content-center">
    {ProductCategorie.map((product) => (
      <div class=" mx-3 col-lg-2 col-md-5 col-sm-10 ">
  <div class="card card-product ">
    <img src={product.img} alt={product.title} class="img_product" />
    <div class="card-body">
      <p class="product-card-title">{product.title}</p>
      <p>{product.price} €/kg</p>
    </div>
  </div>
  {product.size < 1 ? (
      <button class="button-item-nostock mt-2 mb-2">
        <i class="fa-regular fa-face-frown fa-xl mx-2" style={{ color: "#ff0000" }} />
        produit épuisé
      </button>
    ) : (
      <Link to={`/product/${product._id}`}>
        <button class="button-item mt-2 mb-2">
          <i class="fa-solid fa-cart-shopping mx-2" style={{ color: "#485E1B" }}></i>
          Ajouter au panier
        </button>
      </Link>
    )}
  </div>
))}
    </div>

     
      
      </div>
      <Footer/>
    </div>
  )
}

export default Product
