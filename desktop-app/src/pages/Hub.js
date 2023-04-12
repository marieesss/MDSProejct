import React from 'react'
import axios from 'axios';
import { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import Menu from '../components/Menu';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NewHub from '../components/NewHub';
import Form from 'react-bootstrap/Form';
import "../css/app.css";
import ShowHubs from '../components/ShowHubs';




const Hub = () => {
    const [Hubs, setHub] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [adress, setAdress] = useState("");
    const [name, setName] = useState("");
    const [idProduit, setIdproduit] = useState("");

    const userToken = useSelector((state) => state.user.currentUser.accessToken);


    const config = {
       headers: { token: `Bearer ${userToken}` }
   };


    useEffect(() => {
        axios.get(`http://localhost:5000/api/hub/`, config)
          .then(response => {
            console.log(response)
            setHub(response.data)
          })
          .catch(error => {
            console.log(error);
          });
      }, []);
    
  
    const putName = async () => {
      try {
        const res = await axios.put(`http://localhost:5000/api/hub/${idProduit}`, {
            name: name,
           }, 
           config);
           console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    };

    const putAdress = async () => {
        try {
          const res = await axios.put(`http://localhost:5000/api/hub/${idProduit}`, {
              adress: adress,
             }, 
             config);
             console.log(res.data)
        } catch (error) {
          console.log(error)
        }
      };



  return (

    <div>
    <Menu/>


  <div class="title-home-container">
    <h1 class="title-home-content">Nos hubs</h1>
    <img src={require('../img/logo2.png')} width={100} />
  </div>  

  <button class="button-green margin-50 margin-left" onClick={handleShow}>
    créer un produit
  </button>

  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton class="modal-header">
      <Modal.Title>Créer un produit
</Modal.Title>
    </Modal.Header>
    <newProduct/>
    <Modal.Body class="modal-body">
    <NewHub/>
    </Modal.Body>
  </Modal>
  <ShowHubs/>
</div>
  )
}

export default Hub
