import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Menu from '../components/Menu';


const Success = () => {
  const user = useSelector((state) => state.user.currentUser._id);
    const userToken = useSelector((state) => state.user.currentUser.accessToken);
    const [informations, setInformations]= useState({})
    const [idCart, setIdCart]= useState()


    const getOrder = async () => {
  
        try {
          const res = await axios.get(`http://localhost:5000/api/order/find/${user}`, 
             {
                headers: { token: `Bearer ${userToken}` }
             });
             setInformations(res.data)
             console.log(informations)
             setIdCart(res.data._id)
             console.log(idCart)

          
        } catch (error) {
          console.log(error)
        }
      };

      const putOrder = async () => {

        try {
          const res = await axios.put(`http://localhost:5000/api/order/${idCart}`,{
            status: "payé"
          }, 
             {
                headers: { token: `Bearer ${userToken}` }
             });
             console.log(res.data)
          
        } catch (error) {
          console.log(error)
        }
      };
      
useEffect(()=>{
    getOrder()
}, [])

useEffect(()=>{
  putOrder()
}, [informations])



return (
  <div>
    <Menu/>
    <div>
      {informations.status}
    </div>

  </div>
)

}


export default Success
