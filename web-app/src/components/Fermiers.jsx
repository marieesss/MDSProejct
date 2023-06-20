import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';

const Fermiers = () => {
   const  [Fermiers, setFarmer]= useState({});
   const [products, setProducts]= useState({});
   const[fermierId, setFermierId]= useState({});
   const URL = process.env.REACT_APP_API_URL;


   //récupération de tout les fermiers
   useEffect (()=>{
    const getFermiers = async ()=> {
      try{
        // appel à l'API pour récupérer les fermiers
        const res =  await axios.get(`https://${URL}/api/fermier`)
        setFarmer(res.data[0]);
        setFermierId(res.data[0]._id);
      }catch(err){}
    }
    getFermiers();
  }, [])

  useEffect(()=>{
    //méthode pour récupérer les produits en fontion de l'id du producteur
    const getProducts = async ()=> {
      try{
        const res = await axios.get(`https://${URL}/api/product?fermier=${fermierId}` );
        setProducts(res.data)
      }catch(err){
        console.log("erreur")
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
