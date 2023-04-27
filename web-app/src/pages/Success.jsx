import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Menu from '../components/Menu';
import { useLocation } from "react-router-dom";



const Success = () => {
    const user = useSelector((state) => state.user.currentUser._id);
    const userToken = useSelector((state) => state.user.currentUser.accessToken);
    const [informations, setInformations]= useState({})
    const [idCart, setIdCart]= useState()
    const [productsId, setproductsId]= useState()
    const [products, setproducts]= useState()
    const location = useLocation();
    let stripe = location.state.stripe;

    const getOrder = async () => {
  
        try {
          const res = await axios.get(`http://localhost:5000/api/order/find/last/${user}`, 
             {
                headers: { token: `Bearer ${userToken}`,
                userid: `Bearer ${user}`}
             });
             setInformations(res.data)
             
             console.log(res.data)
             setIdCart(res.data[0]._id)
             setproductsId(res.data[0].products)

        } catch (error) {
          console.log(error)
        }
      };


      const getProducts = async () => {
        const products =[]
        for(let i=0; i<productsId.length; i++) {
              try {
                        const res = await axios.get(`http://localhost:5000/api/product/find/${productsId[i].productId}`, 
                          {
                              headers: { token: `Bearer ${userToken}` }
                          });
                          products.push(res.data)
                          console.log(products)
                          setproducts(products)
                      } catch (error) {
                        console.log(error)
                      }
        }
        
  
        
      };

      const putOrder = async () => {
        console.log(informations[0].userId)
        try {
          const res = await axios.put(`http://localhost:5000/api/order/${idCart}/${informations[0].userId}`,{
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
             console.log(res.data)
          
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



return (
  <div>
    <Menu/>
    <div>
      Votre commande a été validé
      
    </div>
   { products ? 
   products.map(product=>(
        <div>
        {product.title}
        <img src={product.img}/>
        </div>
      ))
   : <div> </div>}

   <a href={stripe.receipt_url}><button > Voir le reçu </button></a>
   
  </div>
)

}


export default Success
