import React, { useState } from "react";
import axios from "axios";
// env to switch between the adresses
import env from "react-dotenv";

import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

//using context to pass the user informations between components
import { useContext } from "react";
import { Context } from "../../context/Context";



const Login = () => {
  const context = useContext(Context)
  if (!context) throw new Error('useContext must be used within a Provider')

  const { userState } = context;
  const [user, setUser] = userState;
    
  const { loginSignupState } = context;
  const [loginSignup, setLoginSignup] = loginSignupState;

  // setting the info for the call to the backend
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //function to "fetch" a user in the backend database
  const loginForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios
      .post(`${env.BACKEND_URL}/user/login`, { email, password })
      .then((response) => {
        //  console.log(response.data)
        // checking if we have a positive response
        if (response.data.user) {
          //if we have it let's set the userId in localstorage
          localStorage.setItem("userId", response.data.user.id);
          //and set user in context
          setUser(response.data.user);
        } else {
          // if not send an alert
          alert("wrong email address or password!");
        }
      })
  }

  return (

    <div className="signupLoginForm">
      <h1 className="mg-bt-Xl">Login To Your Account</h1>

      <form onSubmit={loginForm} className="mg-t-Xl">
        <div>
          <div className="formInput mg-t-Xl">
            <label htmlFor="email">Email:</label>
            {/* using useState to save the info I need for the call to the backend */}
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="formInput mg-bt-Xl">
            <label htmlFor="password">Password:</label>
            {/* using useState to save the info I need for the call to the backend */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="buttonsForm pd-t-Xl">
            <Link className="loginLink" to={'/'}><FaArrowLeft className="mg-r-Sm" />Back</Link>
            
            <div className="logSignCont">
              <input className="button dark" type="submit" value="Login"/>
              <p 
                onClick={() => {
                  setLoginSignup('signup')
                }}
              ><u>Signup</u></p>
            </div>
          </div>
        </div>
      </form>
      
    </div>
  
  );
};

export default Login;
