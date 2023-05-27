import React, { useEffect, useState } from 'react'
import ProductList from '../pages/ProductList';
import axios from "axios";
import Product from "./Product"

const Products = ({categorie, Filter, sort}) => {
  const [Products, setProducts]=  useState([])
  const [produitsFiltres, setProduitsFiltres]=  useState([]);

  console.log(categorie, Filter, sort)

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          categorie
            ? `https://${URL}:5000/api/product?category=${categorie}`
            : `https://${URL}:5000/api/product`
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [categorie]);

  useEffect(() => {
    categorie &&
    setProduitsFiltres(
        Products.filter((item) =>
          Object.entries(Filter).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [Products, categorie, Filter]);




  
  return (
    <div>
        {categorie
        ? produitsFiltres.map((item) => <Product item={item} key={item._id} />)
        : Products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item._id} />)}
    </div>
  )
}

export default Products