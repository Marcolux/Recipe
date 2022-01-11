import { Link } from "react-router-dom"
//using context to pass the user informations between components
import { useContext } from 'react';
import { Context } from '../context/Context';


const NavigationBar = ()=>{
    const { userState } = useContext(Context);
    const [user, setUser] = userState
return(

    <div className="NavigationBar">
        <p className="userName">{user.name}</p>
        <Link to='/'>Home</Link>
        {
            user.id?
            <div className="userNavigation">
                <p>search</p>
                <p>add recipe</p>
                <p>grocery list</p>
            </div>:
            <div className="homePageLinks">
                <Link to='/login'><p>Login</p></Link>
                <Link to='/signup'><p>Signup</p></Link>
            </div>
        }
    </div>
)

}

export default NavigationBar