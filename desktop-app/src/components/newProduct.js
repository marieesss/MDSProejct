import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux'
import axios from 'axios';

const NewProduct = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setdesc] = useState("");
  const [img, setImg] = useState("");
  const [categorie, setCategorie] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [fermier, setFermier] = useState("");
  const [message, setMessage] = useState("");
  const userToken = useSelector((state) => state.user.currentUser.accessToken);

  const newProduct = async () => {
    const config = {
      headers: { token: `Bearer ${userToken}` }
  };
    try {
      const res = await axios.post("http://localhost:5000/api/product", {
          title : title,
          desc: desc,
          img: img,
          categories:categorie,
          price: price,
          size: size,
          fermierId: fermier
         }, 
         config);
         console.log(res.data)
         setMessage("Produit bien crée, veuillez rafraichir la page")
      
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
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
        <Form.Control  type="number" placeholder="Enter text" onChange={(e)=>setPrice(e.target.value)}/>
        <Form.Label>Taille</Form.Label>
        <Form.Control  type="number" placeholder="Enter text" onChange={(e)=>setSize(e.target.value)}/>
        <Form.Label>Id du fermier</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setFermier(e.target.value)}/>

      </Form.Group>
      <Button onClick={newProduct} variant="primary" type="submit">
        créer
      </Button>
    </Form>
    </div>
  )
}

export default NewProduct
