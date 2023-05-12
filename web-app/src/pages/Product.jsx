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
  const id = location.pathname.split('/')[2];
  const [Product, setProduct]=  useState({});
  const [ProductCategorie, setProductCategorie]=  useState([]);
  const [Fermier, setFermier]=  useState({});
  const [FermierId, setFermierId]=  useState("");
  const [categorie, setCategorie]=  useState("");
  const [quantity, setQuantity]=  useState(1);
  const dispatch = useDispatch();

  useEffect(()=>{
      const getProduct = async ()=> {
        try{
          const res = await publicRequest.get("/product/find/" + id);
          console.log(res.data)
          setProduct(res.data)
          console.log(res.data.categories)
          setCategorie(res.data.categories.toString())
          console.log(categorie)
          setFermierId(res.data.fermierId)
          
        }catch{

        }
      };
      getProduct();
     
    
      
  }, [])


  useEffect(()=>{
    const getProductCategorie = async ()=> {
      try{
        const res = await axios.get(`http://localhost:5000/api/product?category=${categorie}` );
        setProductCategorie(res.data.slice(0,4))
        console.log(ProductCategorie)
      }catch(err){
        console.log(err)
      }
    };
    getProductCategorie();
   
  
    
}, [categorie])



  useEffect(()=>{
    console.log(FermierId)
    const getFermier = async ()=> {
      try{
        const res = await axios.get(`http://localhost:5000/api/fermier/find/${FermierId}` );
  
        setFermier(res.data)
      }catch(err){
        console.log(err)
      }
    };
    getFermier();
   
  
    
}, [FermierId])


  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(
    addProduct({...Product, quantity })
    )
  }
  return (
    <div>
     <div class="container-fluid p-0 overflow-hidden">

              <Menu/>
      <div class="row justify-content-center" style={{marginTop:"100px"}}>
      <div class="col-lg-6 col-md-12">
        <div class="row justify-content-center">
      <img src={Product.img} class="img-product" />
      </div>
      </div>
      <div class="col-lg-6 col-md-12 mt-5">
      <div class="column">
        <p class="title-product">{Product.title}</p>
        <p class="title-product-fermier">{Fermier.name}</p>
      <p class="title-product-price">{Product.price} euros/kg</p>
      <p>{Product.desc}</p>
      <div class="row row-product-quantity">
      <div class="col-lg-6 col-md-12">
      <div class="row">
        <button class="col-2 product-quantity" onClick={()=>handleQuantity("dec")}>-</button>
        <div class="col-2 product-quantity-number">{quantity}</div>
         <button class="col-2 product-quantity" onClick={()=>handleQuantity("inc")}>+</button>
      
      
      </div>
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
        <div class="col-lg-6 col-md-12">
         <p>{Fermier.name}</p>
         <p>{Fermier.desc}</p>
      
        </div>
        <div class="col-lg-6 col-md-12">
        <img src={Fermier.img} class="product-img-fermier"/>
        </div>

      </div>

      <center><h1 class="title-product-fermier-2 mb-4">Produits similiares</h1></center>
       
    <div class=" row justify-content-center">
        {ProductCategorie.map(product =>

        <div class="card-product mb-5">
        
            <div class="card card-product">
                <img class="card-img-top card-img-product" src={product.img}/>
                <div class="card-body">
                    <h5 class="card-title">{product.title}</h5>
                    <p class="card-text">{product.price} euros</p>
                   
                </div>
             </div> 
             <a href={`/product/${product._id}`}>

                            <button class="button-item mt-2 mb-2">
                            <i class="fa-solid fa-cart-shopping mx-2" style={{color: "#485E1B"}}></i>
                             Ajouter au panier </button>
                    </a>

            </div>

        )}
    </div>

     
      
      </div>
      <Footer/>
    </div>
  )
}

export default Product
