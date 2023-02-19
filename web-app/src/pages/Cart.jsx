import React from 'react'
import { useSelector } from 'react-redux'

const Cart = () => {
  const cart= useSelector(state=> state.cart)
  return (
    <div>
      {cart.Product.map(product =>(
        <div> 
          <p> {product.title}</p>
          <p> {product._id}</p>
          <p> {product.quantity}</p>
          <p> {product.price}</p>
          <p> total {product.price*product.quantity}</p>
         </div>
      ))}

      <h1> TOTAL </h1>
      <div>$ {cart.total}</div>
    </div>
  )
}

export default Cart
