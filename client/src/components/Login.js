import {Link, Outlet} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from "../features/auth/auth";
import { useLoginMutation } from "../features/auth/authapi";

const Login = () => {

  const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')


   const navigate = useNavigate();
   const dispatch = useDispatch()

   const [login, { isLoading } ] = useLoginMutation()

      useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
          const { accessToken } = await login({ username, password }).unwrap()
          dispatch(setCredentials({ accessToken }))
          setUsername('')
          setPassword('')
          navigate('/layout')
      } catch (err) {
          console.log('didnt work')
      }
  }

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)

   return (
<>
   <nav>
            <div class = "nav-links"> 
                <ul>
                  <Link to='/about'>
                    <li><button className="about-btn" onClick={()=>navigate("/about")}>ABOUT</button></li>
                  </Link>
                  <Link to='/contact'>
                    <li><button className="contact-btn">CONTACT</button></li>
                  </Link>
                </ul>
            </div>
        </nav>
    <div className= "text-box">
    <h1>Capcodes </h1>
        <p> Some Sort of Informationa about Capcodes blah blah blah jsdkfjaks djfaksdjfaksd jfasdkfj askdfjakdf </p>
        <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        className="form__input"
                        type="text"
                        id="username"
                        ref={userRef}
                        value={username}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        className="form__input"
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        required
                    />
                    <button className="hero-btn">Sign In</button>
                </form>
   <Link to='/layout'>
    <button className="hero-btn">Login</button>
   </Link>
   <footer>
                <Link to="/signup"><button className="hero-btn">Signup</button></Link>
            </footer>
</div>

<Outlet/>

</>

   )
  };
  
  export default Login;