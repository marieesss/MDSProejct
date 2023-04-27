import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
        // if button enabled with JS hack
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        
          }
          
        try {console.log(email, username, password)
            const response = await axios.post("http://localhost:5000/api/auth/register",
              { username
                  , password
                  , email},
                
            );
            
            console.log(response?.data);
            setSuccess(true);
            setUsername('');
            setPassword('');
            setMatchPwd('');
            window.alert('Votre compte a bien été créé')
            navigate("/login")

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
                console.log(err)
            } else if (err.response?.data?.message) {
                window.alert(err.response?.data?.message)
            } else {
                setErrMsg('Registration Failed')
                console.log(err)
            }
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
                <h1>Register</h1>
                <form onSubmit={handleSubmit} class="col-6">
                    <label htmlFor="username">
                        Username:
                        <i class="fa-solid fa-check" style={{color: "#ff000d"}} className={validName ? "valid" : "hide"}></i>
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
                    <i class="fa-solid fa-circle-info" style={{color: "#27511f"}}></i>                       
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
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
                    <i class="fa-solid fa-circle-info" style={{color: "#27511f"}}></i>                       
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p> 
                    :
                    <div/>}
                    


                    <label htmlFor="password">
                        Password:
                        <i class="fa-solid fa-check" style={{color: "#ff000d"}} className={validName ? "valid" : "hide"}></i>
                        <i class="fa-solid fa-circle-xmark" style={{color: "#ff0000"}} className={validName || !username ? "hide" : "invalid"}></i>
                    </label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                    />
                    {
                        password && !validPwd ? 
                        <p id="pwdnote" className={!validPwd ? "instructions" : "offscreen"}>
                    <i class="fa-solid fa-circle-info" style={{color: "#27511f"}}></i>                       
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>
                        : <div/>

                    }
                   
                    <label htmlFor="confirm_pwd">
                        Confirm Password:
                        <i class="fa-solid fa-check" style={{color: "#ff000d"}} className={validName ? "valid" : "hide"}></i>
                        <i class="fa-solid fa-circle-xmark" style={{color: "#ff0000"}} className={validName || !username ? "hide" : "invalid"}></i>
                    </label>
                    <input
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                    />
                    { !validMatch ? 
                    <p id="confirmnote" className={!validMatch ? "instructions" : "offscreen"}>
                    <i class="fa-solid fa-circle-info" style={{color: "#27511f"}}></i>                       
                     Must match the first password input field.
                    </p> 
                    : <div/>}
                    

                    <button disabled={!validName || !validPwd || !validMatch || !validEmail ? true : false}>Sign Up</button>
                </form>
                <p>
                    Already registered?<br />
                        <a href="/login">Se connecter</a>
                </p>
            </section>
        )}
    </div>
    )
}

export default Inscription