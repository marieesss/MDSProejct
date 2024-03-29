import React from 'react';
import { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import "../css/app.css";



import axios from 'axios';

const ShowProducts = () => {
    const userToken = useSelector((state) => state.user.currentUser.accessToken);
    const [show, setShow] = useState(false);
    const [products, setProducts] = useState([]);
    const [messageDelete, setMessagedelete] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [desc, setdesc] = useState("");
    const [img, setImg] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState();
    const [idProduit, setIdproduit] = useState("");
    const [IdFermier, setIdFermier] = useState("");
    const [Fermier, setFermier] = useState("");
     const config = {
        headers: { token: `Bearer ${userToken}` }
    };
    
  
    const putDesc = async () => {
      try {
        // Requête PUT pour mettre à jour la description d'un produit spécifique
        const res = await axios.put(`https://api.nossproducteurslocaux.fr/api/product/${idProduit}`, {
          desc: desc,
        }, config);
      } catch (error) {
        console.log("erreur");
      }
    };
    
    const putImg = async () => {
      try {
        // Requête PUT pour mettre à jour l'image d'un produit spécifique
        const res = await axios.put(`https://api.nossproducteurslocaux.fr/api/product/${idProduit}`, {
          img: img,
        }, config);
      } catch (error) {
        console.log("erreur");
      }
    };
    
    const putPrice = async (e) => {
      try {
        // Requête PUT pour mettre à jour le prix d'un produit spécifique
        const res = await axios.put(`https://api.nossproducteurslocaux.fr/api/product/${idProduit}`, {
          price: price,
        }, config);
      } catch (error) {
        console.log("erreur");
      }
    };
    
    // Récupération des données des fermiers lors du chargement initial du composant
    useEffect(() => {
      const config = {
        headers: { token: `Bearer ${userToken}` }
      };
    
      axios.get(`https://api.nossproducteurslocaux.fr/api/fermier`, config)
        .then(response => {
          setFermier(response.data);
        })
        .catch(error => {
          console.log("erreur");
        });
    }, []);
    
    // Récupération de toutes les données des produits lors du chargement initial du composant
    useEffect(() => {
      const config = {
        headers: { token: `Bearer ${userToken}` }
      };
    
      axios.get(`https://api.nossproducteurslocaux.fr/api/product/all`, config)
        .then(response => {
          setProducts(response.data);
        })
        .catch(error => {
          console.log("erreur");
        });
    }, []);
    
    function deleteProduct(e) {
      const id = e.target.value;
    
      const config = {
        headers: { token: `Bearer ${userToken}` }
      };
    
      // Requête DELETE pour supprimer un produit spécifique
      axios.delete(`https://api.nossproducteurslocaux.fr/api/product/${id}`, config)
        .then(response => {
          window.location.reload();
        })
        .catch(error => {
          console.log("erreur");
        });
    }
    
    const putFermier = async (e) => {
      try {
        // Requête PUT pour mettre à jour l'ID du fermier associé à un produit spécifique
        const res = await axios.put(`https://api.nossproducteurslocaux.fr/api/product/${idProduit}`, {
          fermierId: IdFermier,
        }, config);
      } catch (error) {
        console.log("erreur");
      }
    };
    
    const putSize = async () => {
      try {
        // Requête PUT pour mettre à jour la quantité d'un produit spécifique
        const res = await axios.put(`https://api.nossproducteurslocaux.fr/api/product/${idProduit}`, {
          size: quantity,
        }, config);
      } catch (error) {
        console.log("erreur");
      }
    };
    

  return (
    <div class="row align-content-center">
        {products.map(product =>(
        <div class="col-lg-4 col-md-12 margin-50 row justify-content-center" > 
            <div class="card" style={{ width: '18rem' }}>
            <div class ="card-header">
            <Card.Img variant="top" src={product.img} class="img-products"/>
            <Card.Body>
              <div class="row justify-content-between">
                <Card.Title>
                <i class="fa-solid fa-tag padding-right" style={{color:" #bac100"}}></i> {product.title}</Card.Title>
                <Card.Text>
                <i class="fa-solid fa-euro-sign padding-right" style={{color: "#bac100"}}></i>{product.price} €
              </Card.Text>
              </div>
            

              <Card.Text>
              <i class="fa-solid fa-layer-group padding-right" style={{color: "#bac100"}}></i>{product.size}
              </Card.Text>
              
              <Card.Text>
              <div>
                  <div> 
                  <i class="fa-solid fa-wheat-awn padding-right" style={{color: "#bac100"}}></i>{ product.fermier[0] ? product.fermier[0].name : null}
                  </div>
              </div>
              
              
              
              </Card.Text>
              
              </Card.Body>
              </div>
              <div class="row justify-content-center">
              <button class="col-5 button-green margin-right"  value={product._id} onClick={deleteProduct}>Supprimer</button> 
              <button class="col-5 button-green" onClick={() => { handleShow(); setIdproduit(product._id);}}value={product._id}>Modifier</button>
              </div>
              <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier un Produit
</Modal.Title>
        </Modal.Header>
        <newProduct/>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3">
        <div class="row justify-content-center align-items-center">
        <div class="col-9">
        <Form.Label class="mt-3">Description</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setdesc(e.target.value)}/>
        </div>
        <div class="col-3 pt-3">
        <button onClick={putDesc} type="submit" class="button-modal mt-3">
        Modifier
      </button><br/>
      </div>
      </div>
      <div class="row justify-content-center align-items-center">
        <div class="col-9">
        <Form.Label class="mt-3">Image</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setImg(e.target.value)}/>
        </div>
        <div class="col-3 pt-3">
        <button onClick={putImg} type="submit" class="button-modal mt-3">
        Modifier
      </button><br/>
      </div>
      </div>
      <div class="row justify-content-center align-items-center">
        <div class="col-9">
        <Form.Label class="mt-3">Prix</Form.Label>
        <Form.Control  type="number" placeholder="Enter text" onChange={(e)=>setPrice(e.target.value)}/>
        </div>
        <div class="col-3 pt-3">
        <button onClick={putPrice} type="submit" class="button-modal mt-3">
        Modifier
      </button><br/>
      </div></div>

      <div class="row justify-content-center align-items-center">
        <div class="col-9">
      <Form.Label class="mt-3">Quantité</Form.Label>
        <Form.Control  type="number" placeholder="Enter text" onChange={(e)=>setQuantity(e.target.value)}/>
        </div>
        <div class="col-3 pt-3">
        <button onClick={putSize} type="submit" class="button-modal mt-3">
        Modifier
      </button><br/>
      </div>
      </div>

      <div class="row justify-content-center align-items-center">
        <div class="col-9">
      <Form.Label class="mt-3">fermier</Form.Label>
        <Form.Select type="text" placeholder="Enter text" onClick={(e)=>setIdFermier(e.target.value)}>
        <option>Choisir un fermier</option>
            { Fermier ? Fermier.map(item=>(
              <option value={item._id}>{item.name}</option>
            ))

            : null }
        </Form.Select>
        </div>
        <div class="col-3 pt-3">
        <button onClick={putFermier} type="submit" class="button-modal mt-3">
        Modifier
      </button>
      </div>
      </div>

      

      </Form.Group>
    </Form>
        </Modal.Body> 
      </Modal> 
            
          </div>
            </div>
        ))}
      </div>
  )
}

export default ShowProducts
