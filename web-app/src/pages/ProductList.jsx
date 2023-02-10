import React from 'react'
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import Menu from '../components/Menu';
import Products from '../components/Products';

const ProductList = () => {
    const Location = useLocation();
    const categorie= Location.pathname.split('/')[2];
    const [Filter, setFilter] = useState({});

    const handleFilter = (e) =>{
       const value=e.target.value;
       setFilter({
        // a enlever si on a pas d'autres filtres
        ...Filter,
        [e.target.name] : value,
       });
    };

    console.log(Filter)
  return (
    <div>
        <Menu/>
        <div>

      <select name="categorie" id="pet-select" onChange={handleFilter}>
          <option value="">--Please choose an option--</option>
          <option name="legume" value="legume">Légume</option>
          <option name="fruit" value="fruit">Fruit</option>
      </select>


        </div>
      <Products/>
    </div>
  )
}

export default ProductList
