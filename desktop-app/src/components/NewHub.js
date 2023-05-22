import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux'
import axios from 'axios';
import {useState, useEffect} from 'react'

const NewHub = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [adress, setAdress] = useState("");
    const [ville, setVille] = useState("");
    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");
    const userToken = useSelector((state) => state.user.currentUser.accessToken);

        const config = {
            headers: { token: `Bearer ${userToken}` }
        };

        const newHub = async (e) => {
            try {
              const res = await axios.post("http://141.94.244.226:80/api/hub/", {
                  name : name,
                  adress: adress,
                  ville: ville,
                  code : code
                 }, 
                 config);
                 console.log(res.data)
                 
                 if (res.status === 200) {
                  setMessage("créé avec succès")
                } else if (res.status === 400) {
                  setMessage("adresse invalide")
                } else {
                  // Erreur serveur
                  setMessage(" problème serveur")
                }
              
            } catch (error) {
              console.log(error)
              console.log(error.config.data)
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
      <button onClick={newHub} variant="primary" type="submit" class="button-modal">
        créer
      </button>
    </Form>
    </div>
  )
}

export default NewHub
