import React, {useState, useEffect} from 'react'
import Menu from '../components/Menu';
import axios from 'axios';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';




const Fermier = () => {
    const [fermier, setFermier] = useState([]);
    const [fermierId, setFermierId] = useState ("") 
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/fermier`)
          .then(response => {
            const productsData = response.data;
            setFermier(productsData);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

      const handleClick=(id)=>{
        navigate('/productf', {state : {fermierId :id}})
      }

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
                    <button onClick={() => handleClick(fermier._id)}> Ajouter au panier </button>
                    
                </div>
                </div>

        )}
    </div>

    <Footer/>
      
    </div>
  )
}

export default Fermier
