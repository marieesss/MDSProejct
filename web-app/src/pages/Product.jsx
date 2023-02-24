import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { publicRequest } from "../requestMethods";
import Menu from '../components/Menu';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';
import axios from 'axios';


const Product = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [Product, setProduct]=  useState({});
  const [Fermier, setFermier]=  useState({});
  const [FermierId, setFermierId]=  useState("");
  const [quantity, setQuantity]=  useState(1);
  const dispatch = useDispatch();

  useEffect(()=>{
      const getProduct = async ()=> {
        try{
          const res = await publicRequest.get("/product/find/" + id);
          setProduct(res.data)
          setFermierId(res.data.fermierId)
          
        }catch{

        }
      };
      getProduct();
     
    
      
  }, [id])


  useEffect(()=>{
    console.log(FermierId)
    const getFermier = async ()=> {
      try{
        const res = await axios.get(`http://localhost:5000/api/fermier/find/${FermierId}` );
  
        setFermier(res.data)
      }catch(err){
        console.log(err)
      }
    };
    getFermier();
   
  
    
}, [FermierId])


  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(
    addProduct({...Product, quantity })
    )
  }
  return (
    <div>
              <Menu/>
      <p>{Product.title}</p>
      <img src={Product.img}/>
      <p>{Product.desc}</p>
      <p>{Product.fermierId}</p>
      <button onClick={()=>handleQuantity("inc")}/>
      <p>{quantity}</p>
      <button onClick={()=>handleQuantity("dec")}/>
      <button onClick={()=>handleClick()}>
        Ajouter au panier
      </button>
      <p>{Fermier.desc}</p>
      <p>{Fermier.name}</p>
      <img src={Fermier.img}/>
    </div>
  )
}

export default Product
