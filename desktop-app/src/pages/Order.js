import React from 'react'
import Menu from '../components/Menu'
import { useEffect, useState} from 'react';
import { useSelector } from 'react-redux'

import axios from 'axios';

const Order = () => {
    const [order, setOrder] = useState([]);
    const [productId, setProductId] = useState([]);
    const [product, setProduct] = useState([]);
    const [OrderListe, setOrderListe] = useState([]);
    const [UserId, setUserId] = useState([]);
    const userToken = useSelector((state) => state.user.currentUser.accessToken);

    
  useEffect(() => {
    const config = {
        headers: { token: `Bearer ${userToken}` }
    };

    axios.get(`http://localhost:5000/api/order`, config)
      .then(response => {
        console.log(response)
        const OrderListe = response.data;
        setOrderListe(OrderListe);
        console.log(OrderListe.length)
        const Product = response.data[2].products[0].productId;
        setProductId(Product);
        // getProduct()
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
        console.log(response)

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
        console.log(response)

      })
      .catch(error => {
        console.log(error);
      });

  }

//   const getProduct= () => {
//     const config = {
//         headers: { token: `Bearer ${userToken}` }
//     };
//     var productListe = [];
//      for(const i=0; i< OrderListe.length;){
//         axios.get(`http://localhost:5000/api/product/find/${OrderListe[i].products[0].productsId}`, config)
//       .then(response => {
//         console.log(response)
//         const ProductListe = response.data;
//         setProduct(ProductListe);
//         productListe.push(response.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//       i= i+1;
//      }
//      console.log(productListe)
//   }




  return (
    <div>
        <Menu/>
        {OrderListe.map(order=>(
            <div class="card" style={{width: '18rem'}}>
                <div class="card-header">
                <ul class="list-group list-group-flush">
                <li class="list-group-item">{order._id} </li>
                
                <li class="list-group-item">
                    {order.status !== "envoyé" ? <button value={order._id} onClick={handleEnvoie}> Commande envoyée </button> :
                      <div>
                      <div>Commande envoyée</div>
                      <button value={order._id} onClick={handleDelete}>Supprimer</button>
                      </div>}
                    
                </li>
                </ul>
                </div>
            
            <div> {order.status} </div>
            </div>
        ))}

      
    </div>
  )
}

export default Order
