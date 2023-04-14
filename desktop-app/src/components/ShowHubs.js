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
import Table from 'react-bootstrap/Table';

const ShowHubs = () => {
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
                     <td><button  onClick={() => { handleShow(); setIdproduit(hub._id);}}value={hub._id} class="button-modal">Modifier</button></td>
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
         <Form.Label class="mt-3">Adress</Form.Label>
         <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setAdress(e.target.value)}/>
         
         <button onClick={putAdress} type="submit" class="button-modal mt-3">
         Modifier
       </button>
    
       </Form.Group>
     </Form>
         </Modal.Body> 
       </Modal> 
       </div>
    </div>
  )
}

export default ShowHubs
