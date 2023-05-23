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
    const [quantity, setQuantity] = useState("");
    const [idProduit, setIdproduit] = useState("");
    const [IdFermier, setIdFermier] = useState("");
    const [Fermier, setFermier] = useState("");
     const config = {
        headers: { token: `Bearer ${userToken}` }
    };
    
  
    const putDesc = async () => {
      try {
        const res = await axios.put(`http://141.94.244.226:80/api/product/${idProduit}`, {
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
        const res = await axios.put(`http://141.94.244.226:80/api/product/${idProduit}`, {
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
        const res = await axios.put(`http://141.94.244.226:80/api/product/${idProduit}`, {
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
    
        axios.get(`http://141.94.244.226:80/api/fermier`, config)
          .then(response => {
            console.log(response.data)
            setFermier(response.data)
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

      useEffect(()=>{
        console.log(Fermier)
      }, [Fermier])

      useEffect(() => {
        const config = {
            headers: { token: `Bearer ${userToken}` }
        };
    
        axios.get(`http://141.94.244.226:80/api/product/all`, config)
          .then(response => {
            console.log(response.data)
            setProducts(response.data)
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

      function deleteProduct (e){
        const id= e.target.value
    
        const config = {
            headers: { token: `Bearer ${userToken}` }
        };
    
        axios.delete(`http://141.94.244.226:80/api/product/${id}`,config)
          .then(response => {
            window.location.reload();
    
          })
          .catch(error => {
            console.log(error);
          });
    
      }

      const putFermier= async (e) => {
        try {
          const res = await axios.put(`http://141.94.244.226:80/api/product/${idProduit}`, {
              fermierId: IdFermier,
             }, 
             config);
             console.log(res.data)
        } catch (error) {
          console.log(error)
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
                <i class="fa-solid fa-euro-sign padding-right" style={{color: "#bac100"}}></i>{product.price} euros
              </Card.Text>
              </div>
              
              <Card.Text>
              <i class="fa-solid fa-pen-to-square padding-right" style={{color: "#bac100"}}></i>{product.desc}
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
        <Form.Label class="mt-3">Description</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setdesc(e.target.value)}/>
        <Button onClick={putDesc} type="submit" class="button-modal mt-3">
        Modifier
      </Button><br/>
        <Form.Label class="mt-3">Image</Form.Label>
        <Form.Control type="text" placeholder="Enter text" onChange={(e)=>setImg(e.target.value)}/>
        <Button onClick={putImg} class="button-modal mt-3" type="submit">
        Modifier
      </Button><br/>
        <Form.Label class="mt-3">Prix</Form.Label>
        <Form.Control  type="number" placeholder="Enter text" onChange={(e)=>setPrice(e.target.value)}/>
        <Button onClick={putPrice} class="button-modal mt-3" type="submit">
        Modifier
      </Button><br/>
      <Form.Label class="mt-3">Id du fermier</Form.Label>
        <Form.Select type="text" placeholder="Enter text" onClick={(e)=>setIdFermier(e.target.value)}>
        <option>Choisir un fermier</option>
            { Fermier ? Fermier.map(item=>(
              <option value={item._id}>{item.name}</option>
            ))

            : null }
        </Form.Select>

        <button onClick={putFermier} type="submit" class="button-modal mt-3">
        Modifier
      </button>

      

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
