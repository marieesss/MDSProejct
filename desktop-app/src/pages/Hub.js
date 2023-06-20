import React from 'react'
import axios from 'axios';
import { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import Menu from '../components/Menu';
import Modal from 'react-bootstrap/Modal';
import NewHub from '../components/NewHub';
import "../css/app.css";
import ShowHubs from '../components/ShowHubs';




const Hub = () => {
    const [Hubs, setHub] = useState([]);
    const [showModal, setShowModal] = useState(false); // Nouvelle variable d'état
    const [errorMessage, setErrorMessage] = useState(); // Variable d'état pour le message d'erreur
    const [successMessage, setSuccessMessage] = useState(); // Variable d'état pour le message de succès


    const userToken = useSelector((state) => state.user.currentUser.accessToken);


    const config = {
       headers: { token: `Bearer ${userToken}` }
   };
    // refresh la page si le hub est bien ajouté a la base de donnée pour le récupérer
   useEffect(()=>{
    if(successMessage===201){
      window.location.reload()
    }
   },[successMessage])

    // recupérer tout les hubs
    useEffect(() => {
        axios.get(`https://api.nossproducteurslocaux.fr/api/hub/`, config)
          .then(response => {
            setHub(response.data)
          })
          .catch(error => {
            console.log("erreur");
          });
      }, []);

      const handleShow = () => {
        setShowModal(true); // Mettre à jour la variable d'état pour ouvrir le modal
      };

      const handleClose = () => {
        setShowModal(false); // Mettre à jour la variable d'état pour fermer le modal
      };
      

  return (

    <div>
    <Menu/>


  <div class="title-home-container">
    <h1 class="title-home-content">Nos hubs</h1>
    <img src={require('../img/logo2.png')} width={100} />
  </div>  

  

  <button class="button-green margin-50 margin-left" onClick={handleShow}>
    créer un Hub
  </button>

  {errorMessage ? <div class="errMsg"> {errorMessage}</div>:  null}

  <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false}>
    <Modal.Header closeButton class="modal-header">
      <Modal.Title>Créer un hub
</Modal.Title>
    </Modal.Header>
    <Modal.Body class="modal-body">
      <NewHub handleClose={handleClose} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage}/>
    </Modal.Body>
  </Modal>

  <ShowHubs/>
</div>
  )
}

export default Hub
