import React from 'react'
import Menu from '../components/Menu'
import { useEffect, useState} from 'react';
import { useSelector } from 'react-redux'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';


const User = () => {
    const userToken = useSelector((state) => state.user.currentUser.accessToken);
    const [userListe, setUserListe] = useState([]);
    const [message, setMessage] = useState("");

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    useEffect(() => {
        const config = {
            headers: { token: `Bearer ${userToken}` }
        };
    
        axios.get(`http://localhost:5000/api/user`, config)
          .then(response => {
            setUserListe(response.data);
            console.log(userListe)
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

      function handleDelete (e){
        console.log(e.target.value)
        const id= e.target.value
    
        const config = {
            headers: { token: `Bearer ${userToken}` }
        };
    
        axios.delete(`http://localhost:5000/api/user/${id}`,config)
          .then(response => {
            console.log(response)
            setMessage("User bien supprimé")
            handleShow()
    
          })
          .catch(error => {
            console.log(error);
          });
    
      }

      function handleAdmin (e){
        console.log(e.target.value)
        const id= e.target.value
        const config = {
            headers: { token: `Bearer ${userToken}` }
        };
        axios.put(`http://localhost:5000/api/user/${id}`,
        {
            isAdmin:true
        },config)
          .then(response => {
            console.log(response)
            setMessage("User bien modifié")
            handleShow()
    
          })
          .catch(error => {
            console.log(error);
          });
    
      }

      function DeleteAdmin (e){
        console.log(e.target.value)
        const id= e.target.value
        const config = {
            headers: { token: `Bearer ${userToken}` }
        };
        axios.put(`http://localhost:5000/api/user/${id}`,
        {
            isAdmin:false
        },config)
          .then(response => {
            console.log(response)
            setMessage("User bien modifié")
            handleShow()
    
          })
          .catch(error => {
            console.log(error);
          });
    
      }
    
  return (
    <div>
        <Menu/>
    <div className={'col-6'}>
         
        <Table striped bordered hover className={"col-5"}>
      <thead>
        <tr>
          <th>username</th>
          <th>email</th>
          <th>Admin</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
         
       
        {userListe.map((user) =>(
        <tr>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.isAdmin ? 
            <div> Admin </div> : 
            <div> Pas Admin</div> 
            }</td>
            <td>
                <Button value={user._id} onClick={handleDelete} variant="warning" className={'m-3'}>Supprimer</Button>
            {user.isAdmin ? 
            <Button value={user._id} onClick={DeleteAdmin} variant="primary">Enlever admin</Button>
            :
            <Button value={user._id} onClick={handleAdmin} variant="success">Attribuer admin</Button>
            }
            </td>
            </tr>
           
            
        ))} 
        
      </tbody>
    </Table>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{message}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         Veuillez actualiser
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      
    </div>
    </div>
  )
}

export default User
