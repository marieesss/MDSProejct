import React from 'react'
import axios from 'axios';
import { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import Menu from '../components/Menu';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NewHub from '../components/NewHub';
import Form from 'react-bootstrap/Form';
import NewFermier from '../components/NewFermier';
import ShowFermier from '../components/ShowFermier';
import "../css/app.css";




const Fermier = () => {
    const [Fermier, setFermier] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [errorMessage, setErrorMessage] = useState(); // Variable d'état pour le message d'erreur
    const [successMessage, setSuccessMessage] = useState(); // Variable d'état pour le message de succès



    const userToken = useSelector((state) => state.user.currentUser.accessToken);


    // refresh la page si le fermier est bien ajouté a la base de donnée pour le récupérer
    useEffect(()=>{
      if(successMessage===200){
        window.location.reload()
      }
     },[successMessage])

    const config = {
       headers: { token: `Bearer ${userToken}` }
   };

 // recupérer tout les fermiers
    useEffect(() => {
        axios.get(`https://api.nossproducteurslocaux.fr/api/fermier/`, config)
          .then(response => {
            setFermier(response.data)
          })
          .catch(error => {
            console.log("erreur");
          });
      }, []);

  return (
    <div>
        <Menu/>

        <div class="title-home-container">
    <h1 class="title-home-content">Nos fermiers</h1>
    <img src={require('../img/logo2.png')} width={100} />
  </div>  

        <button onClick={handleShow} class="button-green margin-50 margin-left">Ajouter un fermier</button>
      {/* affiche un message si il y a une erreur lors de l'enregistrement des données */}
        {errorMessage ? <div class="errMsg"> {errorMessage}</div>:  null}


        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton class="modal-header">
          <Modal.Title>Ajouter un fermier
</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <NewFermier handleClose={handleClose} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage}/>
        </Modal.Body>
      </Modal>
      <ShowFermier/>
      
    </div>
  )
}

export default Fermier
