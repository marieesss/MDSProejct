import React from 'react'
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import Menu from '../components/Menu';
import Products from '../components/Products';

const ProductList = () => {
    const Location = useLocation();
    const categorie= Location.pathname.split('/')[2];
    const [Filter, setFilter] = useState({});
    const [sort, setSort] = useState("newest");

    
    const handleFilter = (e) => {
      const value = e.target.value;
      setFilter({
        ...Filter,
        [e.target.name]: value,
      });
    };
  
  return (
    <div>
        <Menu/>
        <div>

      <select name="categorie" onChange={handleFilter}>
          <option value="rien">--Please choose an option--</option>
          <option value="legume">Légume</option>
          <option value="fruit">Fruit</option>
      </select>

      <select name="bio" onChange={handleFilter}>
          <option>Tout</option>
          <option value="true">Bio</option>
          <option value="false">Pas bio</option>
      </select>

      
      <select name="sort" onChange={(e) => setSort(e.target.value)}>
          <option value="">--Please choose an option--</option>
          <option name="legume" value="newest">Newest</option>
          <option name="fruit" value="asc">Asc</option>
          <option name="fruit" value="desc">Desc</option>
      </select>
        </div>
      <Products categorie={categorie} Filter={Filter} sort={sort}/>
    </div>
  )
}

export default ProductList
