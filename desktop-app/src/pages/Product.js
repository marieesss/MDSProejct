import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NewProduct from '../components/newProduct';
import Form from 'react-bootstrap/Form';
 import { useSelector } from 'react-redux'
import axios from 'axios';
import ShowProducts from '../components/ShowProducts';
import Menu from '../components/Menu';
import "../css/app.css";

const Product = () => {
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
        <Menu/>


      <div class="title-home-container">
        <h1 class="title-home-content">Nos produits</h1>
        <img src={require('../img/logo2.png')} width={100} />
      </div>  

      <button class="button-green margin-50 margin-left" onClick={handleShow}>
        créer un produit
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton class="modal-header">
          <Modal.Title>Créer un produit
</Modal.Title>
        </Modal.Header>
        <newProduct/>
        <Modal.Body class="modal-body">
        <NewProduct/>
        </Modal.Body>
      </Modal>
      <ShowProducts/>
  </div>
  )
}

export default Product
