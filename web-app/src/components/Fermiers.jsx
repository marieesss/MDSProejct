import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';

const Fermiers = () => {
   const  [Fermiers, setFarmer]= useState({});
   const [products, setProducts]= useState({});
   const[fermierId, setFermierId]= useState({});
   const URL = process.env.REACT_APP_API_URL;

   useEffect (()=>{
    const getFermiers = async ()=> {
      try{
        const res =  await axios.get(`https://${URL}/api/fermier`)
        setFarmer(res.data[0]);
        console.log(Fermiers)
        setFermierId(res.data[0]._id);
        console.log(fermierId)
      }catch(err){}
    }
    getFermiers();
  }, [])

  useEffect(()=>{
    
    const getProducts = async ()=> {
      try{
        console.log(fermierId)
        const res = await axios.get(`https://${URL}/api/product?fermier=${fermierId}` );
        setProducts(res.data)
        console.log(products)
      }catch(err){
        console.log(err)
      }
    };
    getProducts();
    
}, [fermierId])

  return (
    <div>
        <div>
           <img src={Fermiers.img} alt={Fermiers.name}/>
        </div>
        <div>
           {Fermiers.name}
        </div>
       <div>
          {products.length > 0 ? products.map(item=>
            <div> 
              <div>
              <img src={item.img}></img>
                {item._id}
                </div>
            </div>
            ) : <div/>}
        </div>
    </div>
  )
}

export default Fermiers
