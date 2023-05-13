import React, {useState, useEffect} from 'react'
import Menu from '../components/Menu';
import axios from 'axios';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';




const Fermier = () => {
    const [fermier, setFermier] = useState([]);
    const [fermierId, setFermierId] = useState ("") 
    const navigate = useNavigate();
    const URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`http://${URL}:5000/api/fermier`)
          .then(response => {
            const productsData = response.data;
            setFermier(productsData);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);


  return (
<div class="container-fluid p-0 overflow-hidden">
<Menu/>

<div class=" row justify-content-center">
        {fermier.map(fermier =>
            <div class="card card-product col-lg-4 col-md-12">
                <img class="card-img-top card-img-product" src={fermier.img}/>
                <div class="card-body">
                    <h5 class="card-title">{fermier.name}</h5>
                    <p class="card-text">{fermier.desc}</p>
                    <Link to="/productf" state={{fermierId : fermier._id}}>
                    <button> Ajouter au panier </button>
                    </Link>
                    
                </div>
                </div>

        )}
    </div>

    <Footer/>
      
    </div>
  )
}

export default Fermier
