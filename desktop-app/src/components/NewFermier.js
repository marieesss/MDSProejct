import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux'
import axios from 'axios';
import {useState, useEffect} from 'react'

const NewFermier = () => {
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
              const res = await axios.post("http://localhost:5000/api/fermier/", {
                  name : name,
                  desc: desc,
                  img: img
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
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setDesc(e.target.value)}/>
        <Form.Label>image</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setImg(e.target.value)}/>
      </Form.Group>
      <Button onClick={newFermier} variant="primary" type="submit">
        créer
      </Button>
    </Form>
    </div>
  )
}

export default NewFermier
