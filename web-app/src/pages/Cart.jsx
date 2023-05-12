import axios from 'axios';
import React, { useState, useEffect } from 'react'

import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import { useSelector, useDispatch} from 'react-redux'
import { delProduct } from '../redux/cartRedux';
import Footer from '../components/Footer';



const Cart = () => {
  const [stripeToken, setStripeToken]= useState(null)
  const [hub, setHub]= useState([])
  const [livraisonFees, setLivraisonFees]= useState(false)
  const [total, setTotal]= useState()
  const [TVA, setTVA]= useState()
  const [hubChoisi, setHubChoisi]= useState({})
  const [stripe, setStripe]= useState("")
  const cart= useSelector(state=> state.cart)
  console.log(cart)
  const user = useSelector((state) => state.user.currentUser._id);
  const userToken = useSelector((state) => state.user.currentUser.accessToken);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const KEY = process.env.REACT_APP_REACT_STRIPE;

  const onToken = (token) => {
    // récupère le token de Stripe contenant les informations
    setStripeToken(token);
  };

  const registerOrderFirst = async () => {
    const config = {
      headers: { token: `Bearer ${userToken}`,
      userid: `Bearer ${user}` }
  };

    const produitarray= []
    console.log(produitarray)
      for(let i = 0; i < cart.Product.length; i++){
        const array= {
          productId : cart.Product[i]._id,
          quantity: cart.Product[i].quantity
        }
        produitarray.push(array)
      }
      console.log(produitarray)
    

    try {
      const res = await axios.post("http://localhost:5000/api/order", {
          userId: user,
          products: produitarray,
          amount: cart.total,
          Status: "En attente de paiement"
         }, 
         config);
         console.log(res.data)
      
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(()=> {
    if(cart.total<50){
      setLivraisonFees(true);
      setTotal((cart.total + 3.99).toFixed(2))
      setTVA(((cart.total)*0.2).toFixed(2))

    }else{
      setTotal((cart.total).toFixed(2))
      setTVA(((cart.total)*0.2).toFixed(2))
    }
  },[cart.total])


  useEffect(()=>{
    // fonction qui envoie une requête de paiement à notre backend
    const makeRequest = async ()=>{
      try{
        // envoie une requête POST avec les informations de paiement au backend
        const res = await axios.post("http://localhost:5000/api/checkout/payment", {
          tokenId: stripeToken.id, // identifiant du token de paiement
          amount:cart.total*100, // montant total de la commande en centimes (pour Stripe)
        });
        // met à jour l'état avec les informations de paiement renvoyées par le backend
        setStripe(res.data)
      }catch(err){
        // si une erreur se produit lors de la demande de paiement, affiche l'erreur dans la console
        console.log(err.response.data)
      }
    }
    // appelle uniquement si un token de paiement est disponible et que le montant total du panier a changé
    stripeToken && makeRequest();
  },  [stripeToken, cart.total])
  

  useEffect(() => {
    // si stripe n'est pas vide et que le statut est égale à succeded
    if (stripe && stripe.status === "succeeded") {
      navigate("/success", {
        state: {
          // passe en paramètres le state stripe
          stripe: stripe,
        }
      });
    }
  }, [stripe, navigate]);
  useEffect (()=>{
    const getHub = async ()=> {
      try{
        const res =  await axios.get("http://localhost:5000/api/hub")
        setHub(res.data);
        console.log(hub)
      }catch(err){}
    }
    getHub();
  }, [])

  const handleFilter = (e) => {
    const value = e.target.value;
        let hubseul = hub.filter(hub=> hub._id.includes(value))
        setHubChoisi(hubseul)
    console.log(hubChoisi)
  };

  return (
    <div class="container-fluid p-0 overflow-hidden">

      <Menu/>
      <h1 class="mt-4 mb-4 padding-100">Mon Panier</h1>

      <div class="row justify-content-center mb-5">
        <div class="col-lg-6 col-md-12">

        {cart.Product.map(product =>(
        <div class="row justify-content-start padding-100 mb-3"> 
          <div class="product-cart row  justify-content-start p-0 col-6">
          <img src={product.img} class="product-img-cart col-6 p-0" />
          <div class="col-6 d-flex flex-column trash proxima">
          <p style={{fontSize:"14px", fontWeight:"700"}}>{product.title}</p>
          <p style={{fontSize:"12px"}}>{product.price} euros x {product.quantity} </p>
          </div>
          </div>
          <div class="col-3 trash p-0">
          <i class="fa-solid fa-trash fa-lg" style={{color: "#485E1B"}} onClick={()=> dispatch(delProduct(product))}></i>
          </div>
         </div>
      ))}

      <div class="padding-100 mt-5">
      <div class="proxima" style={{fontSize:"14px", fontWeight:"700"}}>livraison</div>
      <div class="proxima" style={{fontSize:"14px", fontWeight:"700"}}>A retirer dans nos hubs</div>
<select name="_id" onClick={handleFilter}>
          <option value="rien">Choisir un point de livraison</option>
              {hub.map(hub =>(
            <option value={hub._id}>{hub.name}</option>
          ))}
          </select>
          </div>


        </div>
        <div class="col-lg-6 col-md-12 total-cart-end proxima" style={{fontSize:"14px", fontWeight:"700"}}>
        <div class="total-cart-column" style={{width:"300px"}}>
          <div class="row justify-content-between">
            <div class="col-6 p-0">Produits: {cart.quantity}</div>
            <div class="col-6 p-0">{cart.total} euros</div>
          </div>
          <div class="row justify-content-between">
            <div class="col-6 p-0 text-left">TVA 20% </div>
            <div class="col-6 p-0">{TVA} euros</div>
          </div>
          <div class="row justify-content-between">
            <div class="col-6 p-0">Livraison</div>
            <div class="col-6 p-0">{livraisonFees ? <div> 3,99 euros</div> : <div> Livraison gratuite </div>}</div>
          </div>

          <div class="line-green-cart p-0">
          </div>

          <div class="row justify-content-between">
            <div class="col-6 p-0">Total</div>
            <div class="col-6 p-0">{total}</div>
          </div>
            
          
          <StripeCheckout
      name="Nos producteurs locaux"
      image="https://upload.wikimedia.org/wikipedia/fr/thumb/8/86/Paris_Saint-Germain_Logo.svg/1200px-Paris_Saint-Germain_Logo.svg.png"
      description='Votre total est de'
      billingAddress
      amount={total*100}
      token={onToken}
      stripeKey={KEY}
      >
        <button class="button-cart" onClick={registerOrderFirst}>Paiement</button>
      </StripeCheckout>
      </div>
      </div>
</div>

      <Footer/>
        </div>
    
  )
}

export default Cart
