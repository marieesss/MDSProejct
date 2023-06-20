import React from 'react'
import Menu from '../components/Menu'
import { useEffect, useState} from 'react';
import { useSelector } from 'react-redux'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import "../css/app.css";



const User = () => {
    const userToken = useSelector((state) => state.user.currentUser.accessToken);
    const [userListe, setUserListe] = useState([]);
    const [message, setMessage] = useState("");
    const [searchInput, setSearchInput] = useState('');
    const [userFiltres, setuserFiltres] = useState([]);
    const [searchAdmin, setSearchAdmin] = useState(false);



    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  //récupération de tout les utilisateurs
    useEffect(() => {
        const config = {
            headers: { token: `Bearer ${userToken}` }
        };
    
        axios.get(`https://api.nossproducteurslocaux.fr/api/user`, config)
          .then(response => {
            setUserListe(response.data);
          })
          .catch(error => {
            console.log("erreur");
          });
      }, []);


// méthode pour supprimer l'utilisateur
      function handleDelete (e){
        //récupération de l'id de l'utilisateur
        const id= e.target.value
    
        const config = {
            headers: { token: `Bearer ${userToken}` }
        };
    //appel à l'API pour supprimer en fonction de l'id
        axios.delete(`https://api.nossproducteurslocaux.fr/api/user/${id}`,config)
          .then(response => {
            setMessage("User bien supprimé")
            handleShow()
            window.location.reload()
    
          })
          .catch(error => {
            console.log("erreur");
          });
    
      }

      // méthode pour attribuer le statut d'administrateur
      function handleAdmin (e){
        //récupération de l'id
        const id= e.target.value
        const config = {
            headers: { token: `Bearer ${userToken}` }
        };
        //appel à l'API avec le verbe PUT pour modifier
        axios.put(`https://api.nossproducteurslocaux.fr/api/user/${id}`,
        {
            isAdmin:true
        },config)
          .then(response => {
            setMessage("User bien modifié")
            handleShow()
            window.location.reload()
    
          })
          .catch(error => {
            console.log("erreur");
          });
    
      }
      // méthode pour destituer le statut d'administrateur
      function DeleteAdmin (e){
      //récupération de l'id
        const id= e.target.value
        const config = {
            headers: { token: `Bearer ${userToken}` }
        };
        //appel à l'API avec le verbe PUT pour modifier
        axios.put(`https://api.nossproducteurslocaux.fr/api/user/${id}`,
        {
            isAdmin:false
        },config)
          .then(response => {
            setMessage("User bien modifié")
            handleShow()
    
          })
          .catch(error => {
            console.log("erreur");
          });
    
      }

      // filtre en fontion de la valeur de l'input pour chercher un utilisateur
      const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = userListe.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setuserFiltres(filteredData)
        }
        else{
          setuserFiltres(userListe)
        }
      }

      // Voir tout les utilisateurs admin
      const handleClickAdmin = () => {
        // Si le rendu montre tout les utilisateurs
        if (searchAdmin === false) {
          // filtre les utilisateurs et récupérer que ce qui sont admin
            const filteredData = userListe.filter((item) => {
                return item.isAdmin === true
            })
            //change la classe et le style du bouton
            document.getElementById('btn-Admin').className = "btnAdminTrue col-3";
            setuserFiltres(filteredData)
            setSearchAdmin(true)
        }
      // Si le rendu montre tout les admins
        else{
        //change la classe et le style du bouton
          document.getElementById('btn-Admin').className = "btnAdminFalse col-3";
          setuserFiltres(userListe)
          setSearchAdmin(false)
        }
      }
    
  return (
    <div>
        <Menu/>
        <div class="row justify-content-center">

        
    <div class="col-8 p-0">

    <div class="title-home-container mb-5">
        <h1 class="title-home-content">Nos Utilisateurs</h1>
        <img src={require('../img/logo2.png')} width={100} />
      </div> 

      <div class="row justify-content-center">
        <input type='search' placeholder='Entrez un nom'  class="input-user p-0 mb-3" onChange={(e) => searchItems(e.target.value)}></input>
      </div> 
      <div class="row justify-content-center">
        <button id="btn-Admin" onClick={handleClickAdmin} class="btnAdminFalse col-3 mb-3"> Administrateurs </button>
      </div> 

         
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>username</th>
          <th>email</th>
          <th>Admin</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
         
       
        {  userFiltres.length > 0  // if produitsFiltres = resultat affiche moi valeurs !
          ? 

          userFiltres.map((user) =>(
        <tr>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.isAdmin ? 
            <div> Admin </div> : 
            <div> Pas Admin</div> 
            }</td>
            <td>
                <button id="delete" value={user._id} onClick={handleDelete} class="button-delete m-3" >Supprimer</button>
            {user.isAdmin ? 
            <button value={user._id} onClick={DeleteAdmin} class="button-not-admin">Enlever admin</button>
            :
            <button value={user._id} onClick={handleAdmin} class="button-admin">Attribuer admin</button>
            }
            </td>
            </tr>
           
            
        ))
          
          :
        userListe.map((user) =>(
        <tr>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.isAdmin ? 
            <div> Admin </div> : 
            <div> Pas Admin</div> 
            }</td>
            <td>
                <button value={user._id} onClick={handleDelete} class="button-delete m-3" >Supprimer</button>
            {user.isAdmin ? 
            <button value={user._id} onClick={DeleteAdmin} class="button-not-admin">Enlever admin</button>
            :
            <button value={user._id} onClick={handleAdmin} class="button-admin">Attribuer admin</button>
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
    </div>
  )
}

export default User
