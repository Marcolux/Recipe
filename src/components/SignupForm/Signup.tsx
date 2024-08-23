import React, { useState, useContext } from "react"
import axios from "axios"
import env from "react-dotenv"
import { Context } from "../../context/Context"
import { AiOutlineStop } from "react-icons/ai"
import { TiInputChecked } from "react-icons/ti"



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

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("")
 
  const [showEmailMsg, setShowEmailMsg] = useState(false)
  const [confirmedPassword, setconfirmedPassword] = useState(true)

  const signupForm = async (e: React.FormEvent<HTMLFormElement>) => {
    
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.")
      return
    }
    e.preventDefault()

    const response = await axios.post(`${env.BACKEND_URL}/user/checkEmail`, { email })

    if (!response.data.exists) {
      if (name && email && password && confirmedPassword) {
        
        const response = await axios.post(`${env.BACKEND_URL}/user/`, { name, email, password })
        if (response.data.newUser) {
          localStorage.setItem("userId", response.data.newUser.id)
          setUser(response.data.newUser)
          createInitialCategories(response.data.newUser.id)
        } 
      }
    } else { setShowEmailMsg(true) }

  }

  const checkPasswordConfirm = () => {
    password === confirmPasswordValue ? setconfirmedPassword(true) : setconfirmedPassword(false)
  }

  const createInitialCategories = (newUser: string) => {
    axios.post(`${env.BACKEND_URL}/category/${newUser}`, { categoryName: 'Breakfast'})
    axios.post(`${env.BACKEND_URL}/category/${newUser}`, { categoryName: 'Lunch'})
    axios.post(`${env.BACKEND_URL}/category/${newUser}`, { categoryName: 'Dinner'})
  }

  return (
    
    <div className="signupLoginForm">
      <h1>Create a New Account</h1>
      <form onSubmit={signupForm}>

          {/* ==== User Name */}
          <div className="formInput">
            <label htmlFor="name" id="userName"> User Name: </label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} required/>
          </div>

          {/* ==== Email */}
          <div className={showEmailMsg ? 'error formInput' : 'formInput'}>
            <label htmlFor="email"> Email: </label>
            <input 
              id="email" 
              className={showEmailMsg ? 'error' : ''} 
              value={email} 
              onChange={(e) => {
                setEmail(e.target.value)
                setShowEmailMsg(false)

              }}
              type="email"
              required 
            />
            { 
              showEmailMsg ?
              <p className="error">Email already in use, Please select a different address</p> 
              : null 
            }
          </div>

          {/* ==== Password */}
          <div className="formInput">
            <label htmlFor="password"> Password: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              onKeyUp={() => { checkPasswordConfirm() }}
              required
            /> 
          </div>

          {/* ==== Confirm Password */}
          <div className="formInput">
            <div className="flex alignItems-center">
              <label htmlFor="password" className="mg-r-Sm"> Confirm Password: </label>
              {!confirmedPassword ? <AiOutlineStop className="notValid"/> : <TiInputChecked className="valid" style={{height: "20px", width: '20px'}}/> }
            </div>
            <input
              type="password"
              value={confirmPasswordValue}
              onChange={(e) => { setConfirmPasswordValue(e.target.value) }}
              onKeyUp={() => { checkPasswordConfirm() }}
              required
            />
          </div> 

          {/* ==== Buttons */}
          <div className="buttonsForm"> 
            <div className="logSignCont">
              <input className="button dark mg-r-Lg" type="submit" value="Signup"/>
              <p 
                onClick={() => { setLoginSignup('login')}}
              ><u>Login</u></p>
            </div>
          </div>
      </form>
    </div>
  )
}

export default Signup
