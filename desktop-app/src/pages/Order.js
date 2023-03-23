import React from 'react'
import Menu from '../components/Menu'
import { useEffect, useState} from 'react';
import { useSelector } from 'react-redux'

import axios from 'axios';

const Order = () => {
    const [order, setOrder] = useState([]);
    const [productId, setProductId] = useState({});
    const [product, setProduct] = useState([]);
    const [OrderListe, setOrderListe] = useState([]);
    const [UserId, setUserId] = useState([]);
    const userToken = useSelector((state) => state.user.currentUser.accessToken);

     const config = {
        headers: { token: `Bearer ${userToken}` }
    };


  useEffect(() => {
    axios.get(`http://localhost:5000/api/order`, config)
      .then(response => {
        console.log(response)
        const OrderListe = response.data;
        setOrderListe(OrderListe);
        setProductId(response.data)
        console.log(productId)
        // rechercheProduct()
        
      })
      .catch(error => {
        console.log(error);
      });
      if(productId.length >0){
        getUser(productId)
        console.log(123)
        console.log(productId)
      }else{
        console.log(456)
      }
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

  
  const getUser =(productIdd)=> {
    if(productIdd){
       productIdd.map(item=>{
      console.log("user", item.userId)
        axios.get(`http://localhost:5000/api/user/find/${item.userId}`, config)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error);
      });
      
    })
    }
   
    
  }


//   useEffect(()=>{
//     console.log(productId)
//     productId.map(order => {
//       const orderProduct= []
//       order.products.map(product=>{
//         console.log(product)
//         axios.get(`http://localhost:5000/api/product/find/${product.productId}`, config)
//         .then(response => {
//           console.log(response.data)
//         })
//         .catch(error => {
//           console.log(error);
//         });
        
//       })
//     })
//   }, [productId ])

//  const rechercheProduct = () => {
//     console.log(productId)
//     productId.map(order => {
//       const orderProduct= []
//       order.products.map(product=>{
//         console.log(product)
//         // axios.get(`http://localhost:5000/api/product/find/${product}`, config)
//         // .then(response => {
//         //   console.log(response.data)
//         // })
//         // .catch(error => {
//         //   console.log(error);
//         // });
        
//       })
//     })
//  }
    




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
