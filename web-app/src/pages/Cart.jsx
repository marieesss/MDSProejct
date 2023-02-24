import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';


const Cart = () => {
  const [stripeToken, setStripeToken]= useState(null)
  const [hub, setHub]= useState([])
  const [hubChoisi, setHubChoisi]= useState({})
  const cart= useSelector(state=> state.cart)
  const navigate = useNavigate();

  const KEY = "pk_test_51MVYn2IzQZmuQaNoGP0suRknLYxQ1RWEmf7RkSkhkGciNL7RoL4jEsNZ9r2D02FOlNmKlFTdUffh0dslwwxgLpHO00xx3txkDh";

  const onToken = (token) => {
    setStripeToken(token);
  };

  const registerOrder = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/order", {
          products: cart.products,
          amount: cart.total,
          Hub: hub,
          adresse: "16 rue foncet"
         });
         console.log(res.data)
      
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(()=>{
      const makeRequest = async ()=>{
        try{
         const res = await axios.post("http://localhost:5000/api/checkout/payment", {
          tokenId: stripeToken.id,
          amount:500,
         });
         navigate("/success", {
          stripeData: res.data,
          products: cart, });
          registerOrder();
        }catch(err){
            console.log(err.response.data)
        }
      }
      stripeToken && makeRequest();
  },  [stripeToken, cart.total, navigate,])

  useEffect (()=>{
    const getHub = async ()=> {
      try{
        const res =  await axios.get("http://localhost:5000/api/hub")
        setHub(res.data);
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
    <div>

      <Menu/>
      {cart.Product.map(product =>(
        <div> 
          <p> Produit {product.title}</p>
          <img src={product.img}/>
          <p> Quantité {product.quantity} kg</p>
          <p> Prix au kilo  {product.price} euros </p>
          <p> Total {product.price*product.quantity} euros</p>
         </div>
      ))}

      <h1> TOTAL </h1>
      <div>$ {cart.total}</div>

      

<select name="_id" onChange={handleFilter}>
          <option value="rien">Choisir un point de livraison</option>
          {hub.map(hub =>(
        <option value={hub._id}>{hub.name}</option>
      ))}
      </select>

      <StripeCheckout
      name="Nos producteurs locaux"
      image="https://upload.wikimedia.org/wikipedia/fr/thumb/8/86/Paris_Saint-Germain_Logo.svg/1200px-Paris_Saint-Germain_Logo.svg.png"
      description='Votre total est de'
      billingAddress
      shippingAddress
      amount={500}
      token={onToken}
      stripeKey={KEY}
      >
        <button>Paiement</button>
      </StripeCheckout>
    </div>
  )
}

export default Cart
