import {Link, Outlet} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from 'react'
import axios from "axios";


const Signup = () => {

    const navigate = useNavigate()


    const [userData, setUserData] = useState ({
        username:'',
        password:'',
        firstname:'',
        lastname:'',
        Age:'',
        Streak: 0,
        roles: ["user"],
        active: true
    })


    const onUsernameChanged = e => setUserData({...userData, username: e.target.value})
    const onPasswordChanged = e => setUserData({...userData, password: e.target.value})
    const onFirstnameChanged = e => setUserData({...userData, firstname: e.target.value})
    const onLastNameChanged = e => setUserData({...userData, lastname: e.target.value})
    const onAgeChanged = e => setUserData({...userData, Age: e.target.value})

    const handleSubmit = async (e) => {
        e.preventDefault()
       
        var config = {
            method: 'POST',
            url: 'http://localhost:5000/users',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            data: userData
        };
                    
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
        
    }


   
   return (
<>
    <div className= "text-box">
    <h1>Signup</h1>
        <p> Get started coding today</p>
        <form className="signup-form" onSubmit={handleSubmit}>
                    <label className="username">Username:</label>
                    <input
                        className="form__input"
                        type="text"
                        id="username"
                        onChange={onUsernameChanged}
                        autoComplete="off"
                        required
                    />

                    <label className="password">Password:</label>
                    <input
                        className="form__input"
                        type="password"
                        id="password"
                        onChange={onPasswordChanged}
                        required
                    />
                    <label className="firstname">Firstname:</label>
                    <input
                        className="form__input"
                        type="text"
                        id="username"
                        onChange={onFirstnameChanged}
                        autoComplete="off"
                        required
                    />
                    <label className="lastname">Lastname:</label>
                    <input
                        className="form__input"
                        type="text"
                        id="lastname"
                        onChange={onLastNameChanged}
                        autoComplete="off"
                        required
                    />
                    <label className="age">Age:</label>
                    <input
                        className="form__input"
                        type="text"
                        id="age"
                        onChange={onAgeChanged}
                        autoComplete="off"
                        required
                    />
                    <button className="form__submit-button">Create Account</button>
                </form>
</div>

<Outlet/>

</>

   )
  };
  
  export default Signup;