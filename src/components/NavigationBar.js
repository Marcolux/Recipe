import { Link } from "react-router-dom"
//using context to pass the user informations between components
import { useContext } from 'react';
import { Context } from '../context/Context';
import UserInNavBar from "./UserInNavbar";


const NavigationBar = ()=>{
    const { userState } = useContext(Context);
    const [user, setUser] = userState
return(

    <div className="NavigationBar">
        {
            localStorage.userId?
            <div className="NavigationBar">
                <UserInNavBar/>
                <div className="userNavigation">
                    <Link className="links" to={'/search-recipe'}><p>Search</p></Link>
                    {/* <p>add recipe</p>
                    <p>grocery list</p> */}
                </div>
            </div>
            :
            <div className="homePageLinks">
                <Link className="links" to='/'>Home</Link>
                <Link className="links" to='/login'><p>Login</p></Link>
                <Link className="links" to='/signup'><p>Signup</p></Link>
            </div>
        }
    </div>
)

}

export default NavigationBar