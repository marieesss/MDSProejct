import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';

const Fermiers = () => {
   const  [Fermiers, SetFermiers]= useState();
   const [products, setProducts]= useState();
   useEffect (()=>{
    const getFermiers = async ()=> {
      try{
        const res =  await axios.get("http://localhost:5000/api/fermier")
        SetFermiers(res.data);
        console.log(res.data);
      }catch(err){}
    }
    getFermiers();
  }, [])

  useEffect (()=>{
    const getProducts = async ()=> {
      try{
        const result =  await axios.get("http://localhost:5000/api/fermier")
        SetFermiers(result.data);
        const data= result.data[0]._id
        const res =  await axios.get(`http://localhost:5000/api/product?fermier=${data}`)
        setProducts(res.data);
        console.log(res.data);
      }catch(err){}
    }
    getProducts();
  }, [])

    
  return (
    <div>
        <div>
        </div>
    </div>
  )
}

export default Fermiers
