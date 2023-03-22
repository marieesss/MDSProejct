import React from 'react';
import { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';


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
    const [idProduit, setIdproduit] = useState("");
     const config = {
        headers: { token: `Bearer ${userToken}` }
    };
    
  
    const putDesc = async () => {
      try {
        const res = await axios.put(`http://localhost:5000/api/product/${idProduit}`, {
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
        const res = await axios.put(`http://localhost:5000/api/product/${idProduit}`, {
            img: img,
           }, 
           config);
           console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    };
  
    const putPrice= async (e) => {
      try {
        const res = await axios.put(`http://localhost:5000/api/product/${idProduit}`, {
            price: price,
           }, 
           config);
           console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    };
    useEffect(() => {
        const config = {
            headers: { token: `Bearer ${userToken}` }
        };
    
        axios.get(`http://localhost:5000/api/product`, config)
          .then(response => {
            console.log(response.data)
            setProducts(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

      function deleteProduct (e){
        console.log(e.target.value)
        const id= e.target.value
    
        const config = {
            headers: { token: `Bearer ${userToken}` }
        };
    
        axios.delete(`http://localhost:5000/api/product/${id}`,config)
          .then(response => {
            console.log(response)
            setMessagedelete(true)
    
          })
          .catch(error => {
            console.log(error);
          });
    
      }
    
  return (
    <div>
        {messageDelete ? 
                <Alert key={'success'} variant={'success'}>
                    Ton produit a bien été supprimé merci d'actualiser la page
              </Alert> :
              <></>}
        {products.map(product =>(
        <div> 
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={product.img}/>
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                {product.desc}
              </Card.Text>
              <Card.Text>
                {product.price} euros
              </Card.Text>
              <Button variant="warning" value={product._id} onClick={deleteProduct}>Supprimer</Button> <br/>
              <Button onClick={() => { handleShow(); setIdproduit(product._id);}} variant="success" value={product._id}>Modifier</Button>

              <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier un Produit
</Modal.Title>
        </Modal.Header>
        <newProduct/>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setdesc(e.target.value)}/>
        <Button onClick={putDesc} variant="primary" type="submit">
        créer
      </Button>
        <Form.Label>Image</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setImg(e.target.value)}/>
        <Button onClick={putImg} variant="primary" type="submit">
        créer
      </Button>
        <Form.Label>Prix</Form.Label>
        <Form.Control  type="number" placeholder="Enter text" onChange={(e)=>setPrice(e.target.value)}/>
        <Button onClick={putPrice} variant="primary" type="submit">
        créer
      </Button>

      </Form.Group>
    </Form>
        </Modal.Body> 
      </Modal> 
            </Card.Body>
          </Card>
            </div>
        ))}
      
    </div>
  )
}

export default ShowProducts
