import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { publicRequest } from "../requestMethods";
import Menu from '../components/Menu';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';


const Product = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [Product, setProduct]=  useState({});
  const [quantity, setQuantity]=  useState(1);
  const dispatch = useDispatch();

  useEffect(()=>{
      const getProduct = async ()=> {
        try{
          const res = await publicRequest.get("/product/find/" + id);
          setProduct(res.data)
        }catch{

        }
      };
      getProduct();
  }, [id])

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
      <p>{Product.price}</p>
      <button onClick={()=>handleQuantity("inc")}/>
      <p>{quantity}</p>
      <button onClick={()=>handleQuantity("dec")}/>
      <button onClick={()=>handleClick()}>
        Ajouter au panier
      </button>
    </div>
  )
}

export default Product
