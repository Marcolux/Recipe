import NavigationBar from "../components/NavigationBar"
import { useState } from "react"
import axios from "axios"

const Signup=(props)=>{

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const signupForm = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:3001/user/`, {name, email, password })
        .then((response) => {
            console.log(response)

            localStorage.setItem('userId', response.data.newUser.id)
            props.setUser(response.data.newUser)
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