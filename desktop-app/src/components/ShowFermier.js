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
import Table from 'react-bootstrap/Table';


const ShowFermier = () => {
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
          <div class='row justify-content-center margin-50'>

            <div class="col-10">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>image</th>
                        <th>Nom</th>
                        <th>Descrption</th>
                        <th>Actions</th>
                    </tr>
                </thead>
            <tbody>
                
                { Fermier.map(fermier=> (
                <tr>
                <td><img src={fermier.img} style={{width: "100px"}}/></td>
                    <td>{fermier.name}</td>
                    <td>{fermier.desc}</td>
                    <td><button  onClick={() => { handleShow(); setIdFermier(fermier._id);}}value={fermier._id} class="button-modal">Modifier</button></td>
                </tr>
            ))}  
            </tbody>
        </Table>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier un Produit
</Modal.Title>
        </Modal.Header>
        <newProduct/>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3">
        <Form.Label class="mt-3">Name</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setName(e.target.value)}/>
        <button onClick={putName} class="button-modal mt-3" type="submit">
        Modifier
      </button><br/>
        <Form.Label class="mt-3">Description</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setDesc(e.target.value)}/>
        <button onClick={putDesc} class="button-modal mt-3" type="submit">
        Modifier
      </button><br/>
      <Form.Label class="mt-3">Image</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setImg(e.target.value)}/>
        <button onClick={putImg} class="button-modal mt-3" type="submit">
        Modifier
      </button>
      </Form.Group>
    </Form>
        </Modal.Body> 
      </Modal> 
        
      </div>
    </div>
    </div>
  )
}

export default ShowFermier
