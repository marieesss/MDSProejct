import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/apiCalls';

const Login = () => {
  const [email, setEmail]=useState("")
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {isFetching, error}= useSelector((state)=> state.user)

  const handleClick = (e) =>{
    e.preventDefault();
    login(dispatch, {email, password});
  }
  return (
    
    <div>
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
