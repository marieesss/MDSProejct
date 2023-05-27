import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux'
import axios from 'axios';

const PutProduct = (idProduct) => {
    const [desc, setdesc] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const [idProduit, setIdproduit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [IdFermier, setIdFermier] = useState("");
  setIdproduit(idProduct)
  console.log(idProduit)
  const userToken = useSelector((state) => state.user.currentUser.accessToken);
   const config = {
      headers: { token: `Bearer ${userToken}` }
  };
  

  const putDesc = async () => {
    try {
      const res = await axios.put(`http://141.94.244.226:5000/api/product/${idProduct}`, {
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
      const res = await axios.put(`http://141.94.244.226:5000/api/product/${idProduct}`, {
          img: img,
         }, 
         config);
         console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  };

  const putPrice= async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(`http://141.94.244.226:5000/api/product/${idProduct}`, {
          price: price,
         }, 
         config);
         console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  };

  const putFermier= async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(`http://141.94.244.226:5000/api/product/${idProduct}`, {
          fermierId: IdFermier,
         }, 
         config);
         console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div>
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

      <Form.Label>Fermier Id</Form.Label>
        <Form.Control  type="text" placeholder="Enter text" onChange={(e)=>setIdFermier(e.target.value)}/>
        <Button onClick={putFermier} variant="primary" type="submit">
        créer
      </Button>


      </Form.Group>
    </Form>
    </div>
  )
}

export default PutProduct
