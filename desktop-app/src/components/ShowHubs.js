import React from 'react'
import axios from 'axios';
import { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "../css/app.css";
import Table from 'react-bootstrap/Table';


const ShowHubs = () => {
    const [Hubs, setHub] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState("");
    const [idProduit, setIdproduit] = useState("");

    const userToken = useSelector((state) => state.user.currentUser.accessToken);


    const config = {
       headers: { token: `Bearer ${userToken}` }
   };


   useEffect(() => {
    // Récupération des données des hubs lors du chargement initial du composant
    axios.get(`https://api.nossproducteurslocaux.fr/api/hub/`, config)
      .then(response => {
        // Mise à jour de l'état avec les données des hubs
        setHub(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  
  const putName = async () => {
    try {
      // Requête PUT pour mettre à jour le nom d'un hub spécifique
      const res = await axios.put(`https://api.nossproducteurslocaux.fr/api/hub/${idProduit}`, {
        name: name,
      }, config);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  function handleDelete(e) {
    const id = e.target.value;
  
    const config = {
      headers: { token: `Bearer ${userToken}` }
    };
  
    // Requête DELETE pour supprimer un hub spécifique
    axios.delete(`https://api.nossproducteurslocaux.fr/api/hub/${id}`, config)
      .then(response => {
        // Rechargement de la page après la suppression du hub
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  }
  


  return (
    <div class='row justify-content-center margin-50'>

    <div class="col-10">
        <Table striped bordered hover>
                 <thead>
                     <tr>
                         <th>Nom</th>
                         <th>Adresse</th>
                         <th>Actions</th>
                     </tr>
                 </thead>
             <tbody>
                
                 { Hubs.map(hub=> (
                 <tr>
                     <td>{hub.name}</td>
                     <td>{hub.adress}</td>
                     <td>
                      <button  onClick={() => { handleShow(); setIdproduit(hub._id);}} value={hub._id} class="button-modal mx-5">Modifier</button>
                      <button  onClick={handleDelete} value={hub._id} class="button-modal">Supprimer</button>
                     </td>
                 </tr>
             ))}  
             </tbody>
         </Table>
         <Modal show={show} onHide={handleClose}>
         <Modal.Header closeButton>
           <Modal.Title>Modifier un Hub
 </Modal.Title>
         </Modal.Header>
         <newProduct/>
         <Modal.Body>
         <Form>
       <Form.Group className="mb-3">
         <Form.Label class="mt-3">Name</Form.Label>
         <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setName(e.target.value)}/>
         <button onClick={putName} type="submit" class="button-modal mt-3">
         Modifier
       </button><br/>
       </Form.Group>
     </Form>
         </Modal.Body> 
       </Modal> 
       </div>
    </div>
  )
}

export default ShowHubs
