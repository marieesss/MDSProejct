import React from 'react'
import axios from 'axios';
import { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import Menu from '../components/Menu';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NewHub from '../components/NewHub';
import Form from 'react-bootstrap/Form';




const Hub = () => {
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
    <div>
        <Menu/>

        <button onClick={handleShow}>Ajouter un hub</button>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>créer un produit
</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <NewHub/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        <table>
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
                    <td><button  onClick={() => { handleShow(); setIdproduit(hub._id);}}value={hub._id}>Modifier</button></td>
                </tr>
            ))}  
            </tbody>
        </table>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier un Produit
</Modal.Title>
        </Modal.Header>
        <newProduct/>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setName(e.target.value)}/>
        <Button onClick={putName} variant="primary" type="submit">
        créer
      </Button>
        <Form.Label>Adress</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setAdress(e.target.value)}/>
        <Button onClick={putAdress} variant="primary" type="submit">
        créer
      </Button>
      </Form.Group>
    </Form>
        </Modal.Body> 
      </Modal> 
        
      
    </div>
  )
}

export default Hub
