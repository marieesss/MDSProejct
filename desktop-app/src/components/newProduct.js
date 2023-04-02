import React, {useState, useEffect} from 'react'
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
  const [categorie, setCategorie] = useState();
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [fermier, setFermier] = useState([]);
  const [Idfermier, setIdFermier] = useState("");
  const [message, setMessage] = useState("");
  const userToken = useSelector((state) => state.user.currentUser.accessToken);


  useEffect(() => {
    const config = {
        headers: { token: `Bearer ${userToken}` }
    };

    axios.get(`http://localhost:5000/api/fermier`, config)
      .then(response => {
        console.log(response.data)
        setFermier(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(()=>{
    console.log(fermier)
  }, [fermier])

  useEffect(()=>{
    console.log(categorie)
  }, [categorie])

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
          fermierId: Idfermier
         }, 
         config);
         console.log(res.data)
         setMessage("Produit bien crée, veuillez rafraichir la page")
      
    } catch (error) {
      console.log(error)
      console.log(error.config.data)
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
        <Form.Select onClick={(e)=>setCategorie(e.target.value)}>
          <option value="fruit" >Fruit</option>
          <option value="legume">Légume</option>
        </Form.Select>
        <Form.Label>Prix</Form.Label>
        <Form.Control  type="number" placeholder="Enter text" onChange={(e)=>setPrice(e.target.value)}/>
        <Form.Label>Taille</Form.Label>
        <Form.Control  type="number" placeholder="Enter text" onChange={(e)=>setSize(e.target.value)}/>
        
      <label>fermier</label>
        <Form.Select type="text" placeholder="Enter text" onClick={(e)=>setIdFermier(e.target.value)}>
        <option>Choisir un fermier</option>
            {fermier.map(item=>(
              <option value={item._id}>{item.name}</option>
            ))

            }
        </Form.Select>

      </Form.Group>
      <Button onClick={newProduct} variant="primary" type="submit">
        créer
      </Button>
    </Form>
    </div>
  )
}

export default NewProduct
