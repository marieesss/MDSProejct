import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';

const Fermiers = () => {
   const  [Fermiers, setFarmer]= useState({});
   const [products, setProducts]= useState({});
   const[fermierId, setFermierId]= useState({});


   useEffect (()=>{
    const getFermiers = async ()=> {
      try{
        const res =  await axios.get("http://localhost:5000/api/fermier")
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
        const res = await axios.get(`http://localhost:5000/api/product?fermier=${fermierId}` );
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
           <img src={Fermiers.img}/>
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
