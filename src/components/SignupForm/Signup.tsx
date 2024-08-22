import React, { useState, useContext } from "react";
import axios from "axios";
import env from "react-dotenv"

import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"

const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/
  return re.test(email)
}

const Signup = () => {
  const context = useContext(Context)
  if (!context) throw new Error('useContext must be used within a Provider')

  const { userState } = context
  const [user, setUser] = userState

  const { loginSignupState } = context
  const [loginSignup, setLoginSignup] = loginSignupState

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const [showEmailMsg, setShowEmailMsg] = useState(false)

  const signupForm = async (e: React.FormEvent<HTMLFormElement>) => {
    
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.")
      return;
    }
    e.preventDefault()

    const response = await axios.post(`${env.BACKEND_URL}/user/checkEmail`, { email })

    console.log(response)

    if (!response.data.exists) {

      const response = await axios.post(`${env.BACKEND_URL}/user/`, { name, email, password })
      if (response.data.newUser) {
        localStorage.setItem("userId", response.data.newUser.id);
        setUser(response.data.newUser);
      } 

    } else { setShowEmailMsg(true) }

  }
  return (
    
    <div className="signupLoginForm">
      <h1>Create a New Account</h1>
      <form onSubmit={signupForm}>
        <div>
          <div className="formInput">
            <label htmlFor="name" id="userName"> User Name: </label>
            {/* useState to temporary storage the info for the call to the backend */}
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="formInput">
            <label htmlFor="email"> Email: </label>
            {/* useState to temporary storage the info for the call to the backend */}
            <input id="email" className={showEmailMsg ? 'error' : ''} value={email} onChange={(e) => setEmail(e.target.value)} />
            { 
              showEmailMsg ?
              <p className="error">Email already in use, Please select a different address</p> 
              : null 
            }
          </div>
          <div className="formInput">
            <label htmlFor="password"> Password: </label>
            {/* useState to temporary storage the info for the call to the backend */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="formInput">
            <label htmlFor="password"> Confirm Password: </label>
            {/* useState to temporary storage the info for the call to the backend */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="buttonsForm">
            <Link className="loginLink" to={'/'}><FaArrowLeft className="mg-r-Sm" />Back</Link>
            
            <div className="logSignCont">
              <input className="button dark" type="submit" value="Signup"/>
              <p 
                onClick={() => {
                  setLoginSignup('login')
                }}
              ><u>Login</u></p>
            </div>
          </div>
        </div>
      </form>
      <div className="SomeDecoration"> </div>
      {/* <div className="NavigateHome"> */}
    </div>
  );
};

export default Signup;
