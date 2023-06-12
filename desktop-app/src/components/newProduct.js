import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux'
import axios from 'axios';
import "../css/app.css";

const NewProduct = ({handleClose, setErrorMessage, setSuccessMessage}) => {
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

    axios.get(`https://api.nossproducteurslocaux.fr/api/fermier`, config)
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
      const res = await axios.post("https://api.nossproducteurslocaux.fr/api/product", {
          title : title,
          desc: desc,
          img: img,
          categories:categorie,
          price: price,
          size: size,
          fermierId: Idfermier
         }, 
         config);
         if (res.status === 200) {
          setSuccessMessage(200);
        }
      } catch (error) {
        if (error.response.status === 400) {
          setErrorMessage("Erreur 404 : Veuillez réessayer");
        } else {
          // Erreur serveur
          setErrorMessage("problème serveur");
        }
      }
    };

  const handleCreate = (e)=>{
    e.preventDefault();
    newProduct()
    handleClose()
  }

  return (
    <div>
      <Form>
      <Form.Group className="mb-3">
        <Form.Label class="modal-title">Titre</Form.Label>
        <Form.Control name="titre" type="text" placeholder="Enter text" onChange={(e)=>setTitle(e.target.value)}/>
        <Form.Label class="modal-title">Description</Form.Label>
        <Form.Control name="description" type="text" placeholder="Enter text" onChange={(e)=>setdesc(e.target.value)}/>
        <Form.Label class="modal-title">Image</Form.Label>
        <Form.Control  name="img" type="text" placeholder="Enter text" onChange={(e)=>setImg(e.target.value)}/>
        <Form.Label class="modal-title">Categorie</Form.Label>
        <Form.Select name="cat" onClick={(e)=>setCategorie(e.target.value)}>
        <option value="fruit" >Choisissez la catégorie</option>
          <option value="fruit" >Fruit</option>
          <option value="legume">Légume</option>
        </Form.Select>
        <Form.Label class="modal-title">Prix</Form.Label>
        <Form.Control name="price" type="number" placeholder="Enter text" onChange={(e)=>setPrice(e.target.value)}/>
        <Form.Label class="modal-title">Taille</Form.Label>
        <Form.Control name="taille" type="number" placeholder="Enter text" onChange={(e)=>setSize(e.target.value)}/>
        
      <label class="modal-title">fermier</label>
        <Form.Select name="fermier" type="text" placeholder="Enter text" onChange={(e)=>setIdFermier(e.target.value)}>
        <option value="rien">Choisissez le fermier</option>
            {fermier.map(item=>(
              <option value={item._id}>{item.name}</option>
            ))

            }
        </Form.Select>

      </Form.Group>
      <div class="row justify-content-center">
      <button onClick={handleCreate} type="submit" class="button-modal">
        créer
      </button>
      </div>
    </Form>
    </div>
  )
}

export default NewProduct
