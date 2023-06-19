import React from 'react'
import axios from 'axios';
import { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
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

    
    function cropText(text) {
      // Calcul de la longueur maximale du texte à afficher
      var maxLength = Math.floor(text.length / 2);
      // Récupération de la partie du texte à afficher
      var croppedText = text.substring(0, maxLength);
    
      // Ajout de "..." si le texte d'origine dépasse la longueur maximale
      if (text.length > maxLength) {
        croppedText += "...";
      }
    
      // Retourne le texte recadré
      return croppedText;
    }
    
    useEffect(() => {
      // Récupération des données des fermiers lors du chargement initial du composant
      axios.get(`https://api.nossproducteurslocaux.fr/api/fermier/`, config)
        .then(response => {
          console.log(response);
          // Mise à jour de l'état avec les données des fermiers
          setFermier(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);
    
    const putName = async () => {
      try {
        // Requête PUT pour mettre à jour le nom d'un fermier spécifique
        const res = await axios.put(`https://api.nossproducteurslocaux.fr/api/fermier/${idFermier}`, {
          name: name,
        }, config);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    
    const putDesc = async () => {
      try {
        // Requête PUT pour mettre à jour la description d'un fermier spécifique
        const res = await axios.put(`https://api.nossproducteurslocaux.fr/api/fermier/${idFermier}`, {
          desc: desc,
        }, config);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    
    const putImg = async () => {
      try {
        // Requête PUT pour mettre à jour l'image d'un fermier spécifique
        const res = await axios.put(`https://api.nossproducteurslocaux.fr/api/fermier/${idFermier}`, {
          img: img,
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
    
      // Requête DELETE pour supprimer un fermier spécifique
      axios.delete(`https://api.nossproducteurslocaux.fr/api/fermier/${id}`, config)
        .then(response => {
          console.log(response);
          // Rechargement de la page après la suppression du fermier
          window.location.reload();
        })
        .catch(error => {
          console.log(error);
        });
    }
    
 
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
                
            {Fermier.length > 0 ? Fermier.map(fermier => (
    <tr>
        <td><img src={fermier.img} style={{width: "100px"}}/></td>
        <td>{fermier.name}</td>
        <td> {cropText(fermier.desc)}</td>
        <td >
        <button onClick={() => { handleShow(); setIdFermier(fermier._id);}} value={fermier._id} className="button-modal mb-2">Modifier</button>
        <button  onClick={handleDelete} value={fermier._id} class="button-modal mb-2">Supprimer</button>
        </td>
    </tr>
)) : null}

            </tbody>
        </Table>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier un Producteur
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
        <Form.Control as="textarea" rows={3} />
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
