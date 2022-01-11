import { Link } from "react-router-dom"


const NavigationBar = ()=>{

return(
    <div className="NavigationBar">
        <Link to='/'>Home</Link>
        <div className="homePageLinks">
            <Link to='/login'><p>Login</p></Link>
            <Link to='/signup'><p>Signup</p></Link>
        </div>
    </div>
)

}

export default NavigationBar