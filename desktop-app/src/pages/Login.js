import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/apiCalls';
import "../css/app.css";

const Login = () => {
  const [email, setEmail]=useState("")
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {isFetching, error}= useSelector((state)=> state.user)
  console.log(error)

  const handleClick = (e) =>{
    e.preventDefault();
    login(dispatch, {email, password});
  }
  return (
    <div class="page">
    <div class="container-c login-form-container" >
      
      <form class="form-login container-y">
        <h3>Connexion</h3>
        <div>
        <div><i class="fa-regular fa-user fa-sm padding-right" style={{color:" #ffffff;"}}></i> Adresse mail</div>
          <input class="input-form" name="username" type="text" placeholder="email" onChange={(e)=> setEmail(e.target.value)}/>
        </div>
        <div>
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