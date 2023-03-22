import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NewProduct from '../components/newProduct';
import Form from 'react-bootstrap/Form';
 import { useSelector } from 'react-redux'
import axios from 'axios';
import ShowProducts from '../components/ShowProducts';
import Menu from '../components/Menu';

const Product = () => {
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
        <Menu/>
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
        <NewProduct/>
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
      <ShowProducts/>
  </div>
  )
}

export default Product
