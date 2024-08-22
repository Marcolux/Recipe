import React, { useState } from "react"
import axios from "axios"
import env from "react-dotenv"

import { useContext } from "react"
import { Context } from "../../context/Context"


const Login = () => {
  const context = useContext(Context)
  if (!context) throw new Error('useContext must be used within a Provider')

  const { userState } = context
  const [user, setUser] = userState
    
  const { loginSignupState } = context
  const [loginSignup, setLoginSignup] = loginSignupState

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const loginForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios
      .post(`${env.BACKEND_URL}/user/login`, { email, password })
      .then((response) => {
        if (response.data.user) {
          localStorage.setItem("userId", response.data.user.id)
          setUser(response.data.user)
        } else {
          alert("wrong email address or password!")
        }
      })
  }

  return (

    <div className="signupLoginForm">
      <h1 className="mg-bt-Xl">Login To Your Account</h1>

      <form onSubmit={loginForm} className="mg-t-Xl">
        {/* ==== Email */}
        <div className="formInput mg-t-Xl">
          <label htmlFor="email">Email:</label>
          <input 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>

        {/* ==== Password */}
        <div className="formInput mg-bt-Xl">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="buttonsForm pd-t-Xl">
          <div className="logSignCont">
            <input className="button dark mg-r-Lg" type="submit" value="Login"/>
            <p 
              onClick={() => { setLoginSignup('signup') }}
            ><u>Signup</u></p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login;
