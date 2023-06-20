import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux'
import axios from 'axios';
import {useState, useEffect} from 'react'

const NewHub = ({handleClose, setErrorMessage, setSuccessMessage}) => {
      
  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [ville, setVille] = useState("");
  const [code, setCode] = useState("");

  const userToken = useSelector((state) => state.user.currentUser.accessToken);

    // configuration pour l'appel à l'API
  const config = {
     headers: { token: `Bearer ${userToken}` }
 };

const hancleCreate = (e)=>{
  e.preventDefault();
  newhub()
    handleClose()
  
}


 // méthode pour envoyer les données vers l'API et créer un hub
const newhub = async () => {
  try {
    const res = await axios.post("https://api.nossproducteurslocaux.fr/api/hub/", {
      name: name,
      adress: adress,
      ville: ville,
      code: code
    }, config);
    console.log(res.data)
    if (res.status===201){
      setSuccessMessage(201)
    }
  } catch (error) {
    if (error.response.status === 400) {
      setErrorMessage("Erreur 404 : Addresse non trouvée par Google, veuillez réessayer");
    } else {
      // Erreur serveur
      setErrorMessage("Problème serveur");
    }
  }
};

  return (
    <div>
      <Form>
      <Form.Group className="mb-3">
        <Form.Label>Nom</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setName(e.target.value)}/>
        <Form.Label>Adresse</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setAdress(e.target.value)}/>
        <Form.Label>Ville</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setVille(e.target.value)}/>
        <Form.Label>Code Postal</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setCode(e.target.value)}/>
      </Form.Group>
      <button onClick={hancleCreate} class="button-modal">
        créer
      </button>
    </Form>
    </div>
  )
}

export default NewHub
