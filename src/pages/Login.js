import { useState } from "react"
import axios from "axios"
import NavigationBar from "../components/NavigationBar"

const Login =(props)=>{

    const [email, setEmail] = useState('')
 
    const [password, setPassword] = useState('')

    const loginForm = (e) => {

        e.preventDefault()
        axios.post(`http://localhost:3001/user/login`, { email, password })
        .then((response) => {
            console.log(response)

        localStorage.setItem('userId', response.data.user.id)
        props.setUser(response.data.user)
    })
    }

    return(
        <div className="AuthPage">
            <NavigationBar/>
            <p>Login Form here</p>
                <form className="AuthForm" onSubmit={loginForm}>
                    <div className="subAuthForm">
                        <div className='formInput'>
                            <label htmlFor="email">Email:</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='formInput'>
                            <label htmlFor="password">Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='formInput'>
                            <input className='formButton' type="submit" value="Log In" />
                        </div>
                    </div>
                </form>
        {/* <div className="NavigateHome"></div> */}
        </div>
    )
}

export default Login