import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import newProduct from '../components/newProduct';
import Form from 'react-bootstrap/Form';

const Product = () => {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setdesc] = useState("");
    const [img, setImg] = useState("");
    const [categorie, setCategorie] = useState("");
    const [price, setPrice] = useState("");
    const [size, setSize] = useState("");
    const [fermier, setFermier] = useState("");


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div
  >
<Button variant="primary" onClick={handleShow}>
        créer un produit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>créer un produit
</Modal.Title>
        </Modal.Header>
        <newProduct/>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3">
        <Form.Label>Titre</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setTitle(e.target.value)}/>
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setdesc(e.target.value)}/>
        <Form.Label>Image</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setImg(e.target.value)}/>
        <Form.Label>Categorie</Form.Label>
        <Form.Select>
          <option value="fruit" onClick={(e)=>setCategorie(e.target.value)}>Fruit</option>
          <option value="légume" onClick={(e)=>setCategorie(e.target.value)}>Légume</option>
        </Form.Select>
        <Form.Label>Prix</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setPrice(e.target.value)}/>
        <Form.Label>Taille</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setSize(e.target.value)}/>
        <Form.Label>Id du fermier</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setFermier(e.target.value)}/>

      </Form.Group>
      <Button variant="primary" type="submit">
        créer
      </Button>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  </div>
  )
}

export default Product
