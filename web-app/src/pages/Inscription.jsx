import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Menu from "../components/Menu";
import "../css/app.css"


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const EMAIL_REGEX= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


const Inscription = () => {
    const navigate = useNavigate();


    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);

    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
        console.log(validEmail)
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
        console.log(validPwd)
    }, [password, matchPwd])

    useEffect(() => {
        setValidName(USER_REGEX.test(username));
        console.log( "Valid name", validName)
    }, [username])

    useEffect(() => {
        setErrMsg('');
    }, [username, password, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(password);
        const v3 = USER_REGEX.test(username);
        if (!v1 || !v2 || !v3) {
            window.alert("entrées invalides")
        
          }else{

            try {
                const response = await axios.post(`http://${URL}:80/api/auth/register`,
                  { username
                      , password
                      , email},
                    
                );
                setUsername('');
                setPassword('');
                setMatchPwd('');
                window.alert(`Votre compte a bien été créé ${response.data.username}`)
                navigate("/login")
    
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('No Server Response');
                    console.log(err)
                } else if (err.response?.data?.message) {
                    window.alert(err.response?.data?.message)
                } else {
                    setErrMsg('Veuillez choisir un autre username ou adresse email')
                    console.log(err)
                }
            }

          }
          
        
    }

    const handlePasswordClick = () =>{
        const pwd = document.getElementById('password');
        const icon = document.getElementById('icon');
        if(pwd.getAttribute("type")=="password"){
            pwd.setAttribute("type","text");
            icon.setAttribute("class","fa-sharp fa-solid fa-eye-slash")
        } else {
            pwd.setAttribute("type","password");
            icon.setAttribute("class","fa-sharp fa-solid fa-eye")
        }

    }

    const handleConfirmPasswordClick = ()=>{
        const pwd = document.getElementById('confirm_pwd');
        const icon = document.getElementById('icon-confirm');
        if(pwd.getAttribute("type")=="password"){
            pwd.setAttribute("type","text");
            icon.setAttribute("class","fa-sharp fa-solid fa-eye-slash")
        } else {
            pwd.setAttribute("type","password");
            icon.setAttribute("class","fa-sharp fa-solid fa-eye")
        }
    }
    return (
        <div class="container-fluid p-0 overflow-hidden">
        <Menu/>
        {success ? (
            <section>
                <h1>Success!</h1>
                <p>
                    <a href="#">Sign In</a>
                </p>
            </section>
        ) : (
            <section class=" row justify-content-center">
                <p  className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <center><h1> Inscription</h1></center>
                <form onSubmit={handleSubmit} class="col-6">
                    <label htmlFor="username">
                        Username:
                        <i class="fa-solid fa-check" style={{color: "white"}} className={validName ? "valid" : "hide"}></i>
                        <i class="fa-solid fa-circle-xmark" style={{color: "#ff0000"}} className={validName || !username ? "hide" : "invalid"}></i>
                    </label>
                    <input
                        type="text"
                        id="username"
                        autoComplete="off"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                    />
                    {username && !validName ? 
                        <p className={"instructions"}>
                    <i class="fa-solid fa-circle-info mx-2" style={{color: "white"}}></i>                       
                    8 à 24 caractères.<br />
                        Il doit être commencé par une lettre<br />
                        Lettres, chiffres, soulignés, traits d'union autorisés.
                    </p>
                     : <div/>}
                    

                    <label htmlFor="email">
                        Email:
                        <i class="fa-solid fa-check" style={{color: "#ff000d"}} className={validName ? "valid" : "hide"}></i>
                        <i class="fa-solid fa-circle-xmark" style={{color: "#ff0000"}} className={validName || !username ? "hide" : "invalid"}></i>
                    </label>
                    <input
                        type="text"
                        id="email"
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="uidnote"
                    />
                    {email && !validEmail ?  
                    <p id="uidnote" className={ "instructions"}>
                    <i class="fa-solid fa-circle-info" style={{color: "white"}}></i>                       
                        8 à 24 caractères.<br />
                        Il doit être commencé par une lettre<br />
                        Lettres, chiffres, soulignés, traits d'union autorisés.
                    </p> 
                    :
                    <div/>}
                    

                    <label htmlFor="password ">
                        Password:                        
                        <i class="fa-solid fa-check" style={{color: "#ff000d"}} className={validName ? "valid" : "hide"}></i>
                        <i class="fa-solid fa-circle-xmark" style={{color: "#ff0000"}} className={validName || !username ? "hide" : "invalid"}></i>
                    </label>
                    
                    <div class="pt-site-footer__submit">
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        class='input-mdp'
                        />
                         <i id="icon" onClick={handlePasswordClick} class="fa-sharp fa-solid fa-eye button-mdp"></i>
                         </div>
                    
                    {
                        password && !validPwd ? 
                        <p id="pwdnote" className={!validPwd ? "instructions" : "offscreen"}>
                    <i class="fa-solid fa-circle-info" style={{color: "white"}}></i>                       
                        8 à 24 caractères.<br />
                        Il doit inclure minuscule, majuscule et un caractère spécial<br />
                        caractères utilisés: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>
                        : <div/>

                    }
                   
                    <label htmlFor="confirm_pwd">
                        Confirmez votre mot de passe:
                        <i class="fa-solid fa-check" style={{color: "#ff000d"}} className={validName ? "valid" : "hide"}></i>
                        <i class="fa-solid fa-circle-xmark" style={{color: "#ff0000"}} className={validName || !username ? "hide" : "invalid"}></i>
                    </label>
                    <div class="pt-site-footer__submit">
                    <input
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                    />
                      <i id="icon-confirm" onClick={handleConfirmPasswordClick} class="fa-sharp fa-solid fa-eye button-mdp"></i>
                      </div>
                    { !validMatch ? 
                    <p id="confirmnote" className={!validMatch ? "instructions" : "offscreen"}>
                    <i class="fa-solid fa-circle-info" style={{color: "white"}}></i>                       
                    Doit correspondre au premier champ de saisie du mot de passe.
                    </p> 
                    : <div/>}
                    

                    <button  class="button-auth mt-4" 
                    disabled={!validName || !validPwd || !validMatch || !validEmail ? true : false}>
                    Sign Up</button>
                
                    <p>
                    Déjà enregistré ?<br />
                        <Link to="/login">Se connecter</Link>
                </p>
                
                </form>
               
            </section>
        )}
    </div>
    )
}

export default Inscription