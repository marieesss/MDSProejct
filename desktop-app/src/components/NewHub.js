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
    const userToken = useSelector((state) => state.user.currentUser.accessToken);

        const config = {
            headers: { token: `Bearer ${userToken}` }
        };

        const newHub = async (e) => {
            try {
              const res = await axios.post("http://localhost:5000/api/hub/", {
                  name : name,
                  adress: adress
                 }, 
                 config);
                 console.log(res.data)
                 window.location.reload();
              
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
        <Form.Label>adresse</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setAdress(e.target.value)}/>
      </Form.Group>
      <Button onClick={newHub} variant="primary" type="submit">
        créer
      </Button>
    </Form>
    </div>
  )
}

export default NewHub
