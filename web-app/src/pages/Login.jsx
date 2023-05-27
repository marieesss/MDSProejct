import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../components/Menu';
import { login } from '../redux/apiCalls';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail]=useState("")
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {isFetching, error, isLoggedIn}= useSelector((state)=> state.user)
  const navigate = useNavigate();



  const handleClick = async (e) => {
    try {
      await login(dispatch, { email, password });
      navigate("/");
    } catch (error) {
    }
  };
  return (
    
    <div>
      <Menu/>
      <center><h1> Se connecter</h1></center>
      <div class="row justify-content-center">
      <form class="col-6">
      <label htmlFor="email">
          Email
        </label>
        <input name="username" type="text" placeholder="email" onChange={(e)=> setEmail(e.target.value)}/>
        <label htmlFor="email">
        Mot de passe
        </label>
        <input name="password" type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
        <button class ="button-auth mt-3"onClick={handleClick} disabled= {isFetching}>Se connecter</button>
        { error && 
        <div class="error-message">
        <div>
        <i class="fa-regular fa-face-frown fa-xl mx-2" style={{color: "white"}}/>
          Mot de passe ou email incorrect, veuillez réessayer
          </div>
        </div>}

        <p> Pas inscrit ? <Link to="/inscription">Cliquez ici</Link></p>
      </form>
      </div>
      
    </div>
  )
}

export default Login
