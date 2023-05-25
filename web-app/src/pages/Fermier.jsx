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
        axios.get(`http://${URL}:80/api/fermier`)
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

<div class="row justify-content-center mb-4">
        {fermier.map(fermier =>
        <div class="col-lg-2 col-md-12">
            <div class="card card-product">
                <img class="card-img-top card-img-product" src={fermier.img}/>
                <div class="card-body">
                    <h5 class="card-title">{fermier.name}</h5>
                    <p class="card-text">{fermier.desc}</p>
                   
                    
                </div>
                </div>
                <Link  to="/productf" state={{fermierId : fermier._id}}>
                    <button class="button-item mt-2 mb-2"> Voir ses produits </button>
                    </Link>
                </div>

        )}
    </div>

    <Footer/>
      
    </div>
  )
}

export default Fermier
