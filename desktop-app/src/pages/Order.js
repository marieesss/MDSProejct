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
    const user = useSelector((state) => state.user.currentUser._id);

     const config = {
        headers: { token: `Bearer ${userToken}` }
    };


    useEffect(() => {
      axios.get(`https://api.nossproducteurslocaux.fr/api/order/adminall`, config)
        .then(response => {
          const orders = response.data;
          const updatedOrders = orders.map(order => {
            // Pour chaque commande, nous parcourons les produits
            const updatedProducts = order.products.map(product => {
              // Nous recherchons l'objet productId correspondant au produit en utilisant son _id
              const productIdObj = order.productId.find(item => item.productId === product._id);
              if (productIdObj) {
                // Si un objet productId correspondant est trouvé, je retourne le produit avec la quantité dedans
                return {
                  ...product,
                  quantity: productIdObj.quantity
                };
              } else {
                // Si aucun objet productId correspondant n'est trouvé
                return product;
              }
            });
            // renvoie de la commande mise à jour avec les produits mis à jour
            return {
              ...order,
              products: updatedProducts
            };
          });
          // la liste des commandes mise à jour dans le state orderListe
          setOrderListe(updatedOrders);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);
    
    


  function handleEnvoie (e){
    console.log(e.target.value)
    const id= e.target.value

    const config = {
        headers: { token: `Bearer ${userToken}`,
        userid: `Bearer ${user}` }
    };

    axios.put(`https://api.nossproducteurslocaux.fr/api/order/${id}/${user}`, {
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

    axios.delete(`https://api.nossproducteurslocaux.fr/api/order/${id}`,config)
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
        <div class="title-home-container">
        <h1 class="title-home-content">Commandes</h1>
        <img src={require('../img/logo2.png')} width={100} />
      </div>  
        <div class="row justify-content-center">
        {OrderListe.map(order=>(
            <div class="card m-5" style={{width: '25rem'}}>
                <div class="card-header">
                <ul class="list-group list-group-flush">
                {order.user[0] ? <li class="list-group-item"><div class="fa-solid fa-user padding-right"/>{order.user[0].email} </li> : null}
                <li class="list-group-item">{order.hub} </li>
                <li class="list-group-item">
                  <div class="row justify-content-center product-title">
                  {order.products.map(product=>(
                
                    <div class="col-6" >
                    <img src={product.img} class="img-order"/>
                      <div class="row justify-content-center">
                        <div class="col-9"> {product.title} </div>
                        <div class="col-3" style={{fontSize:"11px"}}>  x {product.quantity} </div>
                      </div>
                  </div>
                
                ))}</div> </li>
                
                
                </ul>
                <div> <i class="fa-solid fa-check padding-right"></i> {order.status} </div>
                <div> <i class="fa-solid fa-check padding-right"></i> Retour stripe : {order.stripeStatus} </div>
                <div><i class="fa-solid fa-euro-sign padding-right"></i> Total {order.amount} € </div>
                {order.receipt_url ? <div> <i class="fa-solid fa-link padding-right" style={{color: "#475E1B;"}}></i> 
                <a href={order.receipt_url}>Voir le reçu</a></div> : <div/>}
                
                <div class=" row justify-content-center">
                    {order.status !== "envoyé" ? 
                    <button class="button-green" value={order._id} onClick={handleEnvoie}> Commande envoyée </button> :
                    
                      <button class="button-green" value={order._id} onClick={handleDelete}>Supprimer la commande</button>
                      }

                      
                </div>
                </div>
            
            
            </div>
        ))}

      
    </div>
    </div>
  )
}

export default Order
