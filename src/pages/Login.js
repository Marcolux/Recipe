import { useState } from "react"
// axios for the call to the backend
import axios from "axios"
// I need to show the navigation bar in this page so I import it
import NavigationBar from "../components/NavigationBar"

//using context to pass the user informations between components
import { useContext } from 'react';
import { Context } from '../context/Context';


const Login =()=>{

    const { userState } = useContext(Context);
    const [user, setUser] = userState
    // setting the info for the call in the backend
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //function to "fetch" a user in the backend database
    const loginForm = (e) => {

        e.preventDefault()
        // axios.post(`http://localhost:3001/user/login`, { email, password })
        axios.post(`http://my-recipes-backen.herokuapp.com/user/login`, { email, password })
        .then((response) => {
            console.log(response)
        // settin the userId in localstorage
        localStorage.setItem('userId', response.data.user.id)
        // setting user in context
        setUser(response.data.user)
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