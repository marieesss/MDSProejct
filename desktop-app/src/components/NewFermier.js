import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux'
import axios from 'axios';
import {useState, useEffect} from 'react'
import "../css/app.css";


const NewFermier = ({handleClose, setErrorMessage, setSuccessMessage}) => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [img, setImg] = useState("");
    const userToken = useSelector((state) => state.user.currentUser.accessToken);

        const config = {
            headers: { token: `Bearer ${userToken}` }
        };

        const newFermier = async () => {
            try {
              const res = await axios.post("https://api.nossproducteurslocaux.fr/api/fermier/", {
                  name : name,
                  desc: desc,
                  img: img
                 }, 
                 config);
                 if (res.status === 200) {
                  setSuccessMessage(200);
                }
              } catch (error) {
                if (error.response.status === 400) {
                  setErrorMessage("Erreur 404 : Veuillez réessayer");
                } else {
                  // Erreur serveur
                  setErrorMessage("Erreur 500: problème serveur");
                }
              }
            };

          const handleCreate = (e)=>{
            e.preventDefault();
            newFermier()
            handleClose()
          }

  return (
    <div>
      <Form>
      <Form.Group className="mb-3">
        <Form.Label>Nom</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setName(e.target.value)}/>
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setDesc(e.target.value)}/>
        <Form.Label>image</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setImg(e.target.value)}/>
      </Form.Group>
      <button onClick={handleCreate}  type="submit" class="button-modal">
        créer
      </button>
    </Form>
    </div>
  )
}

export default NewFermier
