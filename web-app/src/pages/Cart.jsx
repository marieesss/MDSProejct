import axios from 'axios';
import React, { useState, useEffect } from 'react'

import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import { useSelector, useDispatch} from 'react-redux'
import { delProduct } from '../redux/cartRedux';



const Cart = () => {
  const [stripeToken, setStripeToken]= useState(null)
  const [hub, setHub]= useState([])
  const [produits, setProduits]= useState([])
  const [hubChoisi, setHubChoisi]= useState({})
  const [stripe, setStripe]= useState("")
  const [stripeMessage, setStripeMessage] = useState("");
  const cart= useSelector(state=> state.cart)
  const user = useSelector((state) => state.user.currentUser._id);
  const userToken = useSelector((state) => state.user.currentUser.accessToken);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const KEY = "pk_test_51MVYn2IzQZmuQaNoGP0suRknLYxQ1RWEmf7RkSkhkGciNL7RoL4jEsNZ9r2D02FOlNmKlFTdUffh0dslwwxgLpHO00xx3txkDh";

  const onToken = (token) => {
    setStripeToken(token);
  };

  const registerOrderFirst = async () => {
    const config = {
      headers: { token: `Bearer ${userToken}` }
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

  useEffect(()=>{
      const makeRequest = async ()=>{
        try{
         const res = await axios.post("http://localhost:5000/api/checkout/payment", {
          tokenId: stripeToken.id,
          amount:cart.total*100,
         });
         let data= res.data
         setStripe(res.data)
         setStripeMessage(data.message)
         console.log(res.data)
        }catch(err){
            console.log(err.response.data)
        }
      }
      stripeToken && makeRequest();
  },  [stripeToken, cart.total, navigate,])

  useEffect(() => {
    console.log(stripe);
    if (stripe && stripe.status === "succeeded") {
      navigate("/success", {
        state: {
          stripe: stripe,
        }
      });
    }
  }, [stripe, cart, navigate]);

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
    <div>

      <Menu/>
      {cart.Product.map(product =>(
        <div> 
          <p> Produit {product.title}</p>
          <img src={product.img}/>
          <p> Quantité {product.quantity} kg</p>
          <p> Prix au kilo  {product.price} euros </p>
          <p> Total {product.price*product.quantity} euros</p>
          <button onClick={()=> dispatch(delProduct(product._id))}> Supprimer </button>
         </div>
      ))}

      <h1> TOTAL </h1>
      <div>$ {cart.total}</div>

      

<select name="_id" onClick={handleFilter}>
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
      amount={cart.total*100}
      token={onToken}
      stripeKey={KEY}
      >
        <button onClick={registerOrderFirst}>Paiement</button>
      </StripeCheckout>
    </div>
  )
}

export default Cart
