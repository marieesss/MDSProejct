import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../components/Menu';
import { login } from '../redux/apiCalls';
import { useNavigate } from 'react-router-dom';

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
      <form>
        <input name="username" type="text" placeholder="email" onChange={(e)=> setEmail(e.target.value)}/>
        <input name="password" type="password" placeholder="Password"onChange={(e)=> setPassword(e.target.value)}/>
        <button onClick={handleClick} disabled= {isFetching}>Se connecter</button>
        { error && <p> Something went wrong</p>}
      </form>
      
    </div>
  )
}

export default Login
