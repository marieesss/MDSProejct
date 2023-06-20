import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/apiCalls';
import "../css/app.css";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail]=useState("")
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {isFetching, error}= useSelector((state)=> state.user)
  const navigate = useNavigate();


  const handleClick = (e) =>{
    e.preventDefault();
      // envoie l'action au réducer login pour se connecter
    login(dispatch, {email, password});
      // envoie vers la page principale
    navigate('/')
  }
  return (
    <div class="page overflow-hidden">
    <div class="row justify-content-center" >
      
      <form class="col-6 form-login row justify-content-center">
        <h3>Connexion</h3>
        <div class="row justify-content-center">
        <div><i class="fa-regular fa-user fa-sm padding-right" style={{color:" #ffffff;"}}></i> Adresse mail</div>
          <input class="input-form" name="username" type="text" placeholder="email" onChange={(e)=> setEmail(e.target.value)}/>
        </div>
        <div class="row justify-content-center">
        <div><i class="fa-solid fa-lock padding-right" style={{color:" #ffffff;"}}></i> Password</div>
        <input class="input-form" name="password" type="password" placeholder="Password"onChange={(e)=> setPassword(e.target.value)}/>
        </div>
        <button onClick={handleClick} disabled= {isFetching} class="button-green">Se connecter</button>
        { error && <p> Mail ou mot de passe incorrect</p>}
      </form>
      
    </div>
    </div>
  )
}

export default Login