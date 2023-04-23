import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import axios from 'axios';
import Menu from './Menu';

function ProductListTest() {
  const [produitsFiltres, setProduitsFiltres] = useState([]);
  const [products, setProducts] = useState ([]) // championSort, setChampionsSort
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/product`)
      .then(response => {
        console.log(response)
        const productsData = response.data;
        const productsList = Object.keys(productsData).map(key => productsData[key]);
        console.log(productsList)
        setProducts(productsList);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);



  const sort = () => {
    setProduitsFiltres(products.filter(product => product.categories.includes(document.getElementById("select").value))); // results championSort
  }

const searchItems = (searchValue) => {
  setSearchInput(searchValue)
  if (searchInput !== '') {
      const filteredData = products.filter((item) => {
          return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setProduitsFiltres(filteredData)
  }
  else{
    setProduitsFiltres(products)
  }
}



  return (
    <div>
      <Menu/>
<select name="categorie" id='select' onChange={sort}>
          <option value="rien">--Please choose an option--</option>
          <option value="legume">Légume</option>
          <option value="fruit">Fruit</option>
      </select>

      <input icon='search'
                placeholder='Search...'
                onChange={(e) => searchItems(e.target.value)}
            />

      

      <div className="products">
      {
        produitsFiltres.length > 0  // if produitsFiltres = resultat affiche moi valeurs !
        ?
        produitsFiltres.map(product => (
            <div key={product.id}>
              <h2>{product.title}</h2>
              <p>Type: {product.categories.join(', ')}</p>
              <img src={product.img} alt={product.title} />
              <p>{product.price}</p>
              <p>{product.fermierId}</p>
              <p>{product.bio}</p>
              <Link to={`/product/${product._id}`}>
                <button> Acheter </button>
            </Link>

            </div>
          ))
        :   // else championsSort = nul affiche moi tout !
        products.map(product => (
          <div key={product.id}>
            <h2>{product.title}</h2>
            <p>Type: {product.categories.join(', ')}</p>
            <img src={product.img} alt={product.title} />
            <p>{product.price}</p>
            <p>{product.fermierId}</p>
            <p>{product.bio}</p>
            <p>{product.price}</p>
            <Link to={`/product/${product._id}`}>
                <button> Acheter </button>
            </Link>

            
          </div>
        ))
        
      }
      </div>
    </div>
  );
}


export default ProductListTest;

