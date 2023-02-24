import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';

const Fermiers = () => {
   const  [Fermiers, SetFermiers]= useState();
   const [products, setProducts]= useState();
   const[fermierId, setFermierId]= useState({});


   useEffect (()=>{
    const getFermiers = async ()=> {
      try{
        const res =  await axios.get("http://localhost:5000/api/fermier")
        SetFermiers(res.data);
        setFermierId(res.data[0]);
      }catch(err){}
    }
    getFermiers();
  }, [])

  useEffect(()=>{
    
    const getProducts = async ()=> {
      try{
        console.log(fermierId)
        const res = await axios.get(`http://localhost:5000/api/product?fermier=${fermierId._id}` );
        console.log(res.data)
        setProducts(res.data)
      }catch(err){
        console.log(err)
      }
    };
    getProducts();
    
}, [fermierId])

  return (
    <div>
        <div>

        </div>
    </div>
  )
}

export default Fermiers
