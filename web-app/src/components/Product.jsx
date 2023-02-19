import React from 'react'
import { Link } from "react-router-dom";

const Product = ({item}) => {
  return (
    <div>
      <p>{item.title}</p>
      <img src={item.img}/>
      <p>{item.price}</p>
      <p>{item.fermierId}</p>
      <p>{item.bio}</p>
      <Link to={`/product/${item._id}`}>
      <button> Acheter </button>
    </Link>
    </div>
  )
}

export default Product
