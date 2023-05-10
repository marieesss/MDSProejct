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

  const handleClick = (e) =>{
    e.preventDefault();
    login(dispatch, {email, password});
    if(isLoggedIn === true){
      navigate("/")
    }
  }
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
        <input name="password" type="password" placeholder="Password"onChange={(e)=> setPassword(e.target.value)}/>
        <button class ="button-auth mt-3"onClick={handleClick} disabled= {isFetching}>Se connecter</button>
        { error && <p> Something went wrong</p>}

        <p> Pas inscrit ? <Link to="/inscription">Cliquez ici</Link></p>
      </form>
      </div>
      
    </div>
  )
}

export default Login
