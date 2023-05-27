import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Menu from '../components/Menu';
import Footer from '../components/Footer'
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SuccessLogo from '../assets/success.png';





const Success = () => {
    const user = useSelector((state) => state.user.currentUser._id);
    const userToken = useSelector((state) => state.user.currentUser.accessToken);
    const [informations, setInformations]= useState({})
    const [idCart, setIdCart]= useState()
    const [amount, setAmount]= useState("")
    const [hubId, setHubid]= useState("")
    const [hub, setHub]= useState({})
    const [productsId, setproductsId]= useState()
    const [productsTab, setproducts]= useState()
    const location = useLocation();
    let stripe = location.state.stripe;
    const URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const getOrder = async () => {
  
        try {
          const res = await axios.get(`http://${URL}:5000/api/order/find/last/${user}`, 
             {
                headers: { token: `Bearer ${userToken}`,
                userid: `Bearer ${user}`}
             });
             setInformations(res.data)
             
             console.log(res.data)
             setIdCart(res.data[0]._id)
             setHubid(res.data[0].hubId)
             setAmount(res.data[0].amount)
             setproductsId(res.data[0].products)

        } catch (error) {
          console.log(error)
        }
      };

      const getHub = async () => {
  
        try {
          const res = await axios.get(`http://${URL}:5000/api/hub/find/${hubId}`);
           setHub(res.data[0])
           console.log(res.data[0])

        } catch (error) {
          console.log(error)
        }
      };


      const getProducts = async () => {
        console.log(productsId)
        console.log(productsId.length)
        const products =[]
        for(let i=0; i<productsId.length; i++) {
              try {
                        const res = await axios.get(`http://${URL}:5000/api/product/find/${productsId[i].productId}`, 
                          {
                              headers: { token: `Bearer ${userToken}` }
                          });
                          products.push(res.data)
                          console.log(products)
                         
                      } catch (error) {
                        console.log(error)
                      }
        }
        setproducts(products)  
  
        
      };

      const putOrder = async () => {
        try {
          const res = await axios.put(`http://${URL}:5000/api/order/${idCart}/${informations[0].userId}`,{
            status: "payé",
            stripeStatus : stripe.status, 
            billingAdress : {
              adress : {
                city : stripe.billing_details.address.city,
                country : stripe.billing_details.address.country,
                adress : stripe.billing_details.address.line1,
                postal_code : stripe.billing_details.address.postal_code
              }
            },
            receipt_url: stripe.receipt_url

          }, 
             {
                headers: { token: `Bearer ${userToken}`,
                userid: `Bearer ${user}`},
             });
          
        } catch (error) {
          console.log(error)
        }
      };
      
useEffect(()=>{
    getOrder()
}, [user, userToken])

useEffect(()=>{
  putOrder()
}, [informations])

useEffect(()=>{
  getProducts()
}, [productsId])


useEffect(()=>{
  console.log(hubId)
  getHub()
}, [hubId])


return (
  <div class="overflow-hidden">
    <Menu/>
    <div class="row justify-content-center mt-3">
    <img src={SuccessLogo} class="successImg"/>
    </div>
    <div class="container mt-5">
    <div class="row justify-content-center">
    <h1 class="commande-title">Votre commande a bien été pris en compte</h1>
    
    </div>

    <div class="row justify-content-between"> 
    <p class="font-vert col-6">Nous vous ferons savoir quand elle embarquera et se dirigera vers vous.</p>
    <p class="col-3 font-vert"><a href='/'> Retourner à la boutique</a></p>
    </div>

    <div class="line-green-cart p-0">
          </div>

          <div class="row justify-content-center mb-5">
        <div class="col-lg-6 col-md-12 mt-3">
          { productsTab ? productsTab.map(product =>(
        <div class="row justify-content-start padding-100 mb-3"> 
          <div class="product-cart row  justify-content-start p-0 col-6">
          <img src={product.img} class="product-img-cart col-6 p-0" />
          <div class="col-6 d-flex flex-column trash proxima">
          <p style={{fontSize:"14px", fontWeight:"700"}}>{product.title}</p>
          <p style={{fontSize:"12px"}}>{product.price} euros </p>
          </div>
          </div>
         </div>
      )) : null }

      </div>

      <div class="col-lg-6 col-md-12 total-cart-end proxima" style={{fontSize:"14px", fontWeight:"700"}}>
        <div class="total-cart-column" style={{width:"300px"}}>
          <div class="row justify-content-between">
            <div class="col-6 p-0">Total</div>
            <div class="col-6 p-0">{amount} euros</div>
          </div>

          <div class="line-green-cart p-0">
          </div>

          <div class="row justify-content-between">
            <div class="col-6 p-0">Dont TVA</div>
            <div class="col-6 p-0">{((amount * 20)/100).toFixed(2)} euros</div>
          </div>

          <div class="row justify-content-between">
            <div class="col-6 p-0">Dont Livraison</div>
            <div class="col-6 p-0">{amount - 3.99 > 50 ? 
             <p>0 euros</p> : <p> 3.99 euros </p>}</div>
          </div>
          <a href={stripe.receipt_url}><button class="button-item "> Voir le reçu </button></a>
      </div>
      </div>

      <div class="line-green-cart p-0 mt-2">
          </div>

      <div class="proxima mt-2" style={{fontSize:"14px", fontWeight:"700"}}>
      Votre commande s’apprête à être livrée au :       
      </div>
      <div>
      {hub.name}
      </div>
      <div>
      {hub.adress}
      </div>
      <div>
      {hub.ville}
      </div>
      <div>
      {hub.code}
      </div>
      <a href={`https://www.google.com/maps/search/?api=1&query=${hub.latitude},${hub.longitude}`} target="_blank">
        <button class="button-item mt-1">Voir l'adresse </button>
      </a>
  


   </div>
   
  </div>
  <Footer/>
  </div>
)

}


export default Success
