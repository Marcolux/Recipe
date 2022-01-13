import { useState } from "react"

//using context to pass the user informations between components
import { useContext } from 'react';
import { Context } from '../context/Context';

// axios for the call to the backend
import axios from "axios"

// I need to show the navigation bar in this page so I import it
import NavigationBar from "../components/NavigationBar"

const Signup=()=>{

    const { userState } = useContext(Context);
    const [user, setUser] = userState

    // setting the info for the call in the backend to create a user in users table
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    //function to create a user in the backend database
    const signupForm = (e) => {
        e.preventDefault()
        // axios.post(`http://localhost:3001/user/`, {name, email, password })
        axios.post(`http://my-recipes-backen.herokuapp.com/user/`, {name, email, password })
        .then((response) => {
            console.log(response)
            // settin the userId in localstorage
            localStorage.setItem('userId', response.data.newUser.id)
            // setting user in context
            setUser(response.data.newUser)
        })
    }
    return(
        <div className="AuthPage">
            <NavigationBar/>
            <p>Signup Form here</p>
                <form className="AuthForm" onSubmit={signupForm}>
                    <div className="subAuthForm">   
                        <div className='formInput'>
                            <label htmlFor="name" id='userName'>User Name:</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='formInput'>
                            <label htmlFor="email">Email:</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='formInput'>
                            <label htmlFor="password">Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='formInput'>
                            <input className='formButton' type="submit" value="Submit" />
                        </div>
                    </div>
                </form>
        {/* <div className="NavigateHome"> */}
       
        </div>
    )
}

export default Signup