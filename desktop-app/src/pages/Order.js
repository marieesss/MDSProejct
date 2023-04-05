import React from 'react'
import Menu from '../components/Menu'
import { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import "../css/app.css";

import axios from 'axios';

const Order = () => {
    const [order, setOrder] = useState([]);
    const [productId, setProductId] = useState({});
    const [product, setProduct] = useState([]);
    const [OrderListe, setOrderListe] = useState([]);
    const userToken = useSelector((state) => state.user.currentUser.accessToken);

     const config = {
        headers: { token: `Bearer ${userToken}` }
    };


  useEffect(() => {
    axios.get(`http://localhost:5000/api/order/adminall`, config)
      .then(response => {
        console.log(response)
        setOrderListe(response.data)
        
        
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  function handleEnvoie (e){
    console.log(e.target.value)
    const id= e.target.value

    const config = {
        headers: { token: `Bearer ${userToken}` }
    };

    axios.put(`http://localhost:5000/api/order/${id}`, {
        status : "envoyé"
    },config)
      .then(response => {
        window.location.reload();

      })
      .catch(error => {
        console.log(error);
      });

  }

  function handleDelete (e){
    console.log(e.target.value)
    const id= e.target.value

    const config = {
        headers: { token: `Bearer ${userToken}` }
    };

    axios.delete(`http://localhost:5000/api/order/${id}`,config)
      .then(response => {
        window.location.reload();

      })
      .catch(error => {
        console.log(error);
      });

  }


  return (
    <div>
        <Menu/>
        <h1>Commandes</h1>
        <div class="row justify-content-center">
        {OrderListe.map(order=>(
            <div class="card m-5" style={{width: '25rem'}}>
                <div class="card-header">
                <ul class="list-group list-group-flush">
                <li class="list-group-item"><div class="fa-solid fa-user padding-right"/>{order.user[0].email} </li>
                <li class="list-group-item">{order.hub} </li>
                <li class="list-group-item">
                  <div class="row justify-content-center">
                  {order.products.map(product=>(
                
                    <div class="col-6" >
                    <img src={product.img} class="img-order"/>
                    <div>{product.title}</div>
                  </div>
                
                ))}</div> </li>
                
                
                </ul>
                <div> <i class="fa-solid fa-check padding-right"></i> {order.status} </div>
                <div> <i class="fa-solid fa-check padding-right"></i> Retour stripe : {order.stripeStatus} </div>
                <div><i class="fa-solid fa-euro-sign padding-right"></i> Total {order.amount} euros </div>
                <div class=" row justify-content-center">
                    {order.status !== "envoyé" ? 
                    <button class="button-green" value={order._id} onClick={handleEnvoie}> Commande envoyée </button> :
                      <div>
                      <div>Commande envoyée</div>
                      <div class="button-green"value={order._id} onClick={handleDelete}>Supprimer</div>
                      </div>}
                      {order.receipt_url ? <a href={order.receipt_url}><div class="button-green">  reçu  </div></a> : <div> </div>}
                      
                </div>
                </div>
            
            
            </div>
        ))}

      
    </div>
    </div>
  )
}

export default Order
