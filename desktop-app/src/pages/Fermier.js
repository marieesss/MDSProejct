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




const Fermier = () => {
    const [Fermier, setFermier] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [desc, setDesc] = useState("");
    const [img, setImg] = useState("");
    const [name, setName] = useState("");
    const [idFermier, setIdFermier] = useState("");

    const userToken = useSelector((state) => state.user.currentUser.accessToken);


    const config = {
       headers: { token: `Bearer ${userToken}` }
   };


    useEffect(() => {
        axios.get(`http://localhost:5000/api/fermier/`, config)
          .then(response => {
            console.log(response)
            setFermier(response.data)
          })
          .catch(error => {
            console.log(error);
          });
      }, []);
    
  
    const putName = async () => {
      try {
        const res = await axios.put(`http://localhost:5000/api/fermier/${idFermier}`, {
            name: name,
           }, 
           config);
           console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    };

    const putDesc = async () => {
        try {
          const res = await axios.put(`http://localhost:5000/api/fermier/${idFermier}`, {
              desc: desc,
             }, 
             config);
             console.log(res.data)
        } catch (error) {
          console.log(error)
        }
      };

      const putImg = async () => {
        try {
          const res = await axios.put(`http://localhost:5000/api/fermier/${idFermier}`, {
              img: img,
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

        <button onClick={handleShow} class="button-modal">Ajouter un fermier</button>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton class="modal-header">
          <Modal.Title>Ajouter un fermier
</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <NewFermier/>
        </Modal.Body>
      </Modal>
      <ShowFermier/>
      
    </div>
  )
}

export default Fermier
