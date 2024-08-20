import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//using context to pass the user informations between components
import { useContext } from "react";
import { Context } from "../context/Context";
import UserInNavBar from "./UserInNavbar";

const NavigationBar = () => {
  const history = useNavigate()
  
  const { userState } = useContext(Context)
  const [user, setUser] = userState
  
  return (
    
    localStorage.userId ? (
      <div className="NavigationBar">
        {/* <div className="userNavigation"> */}
        <UserInNavBar />
          <Link className="links" to={"/search-recipe"}>
            <p>Search</p>
          </Link>
          {/* <p>add recipe</p>
                  <p>grocery list</p> */}
        <button className="button-orange mr-20"
          onClick={() => {
            localStorage.removeItem("userId");
            history("/");
            setUser({});
          }}
        >
          logout
        </button>
        </div>
        
      // </div>
    ) : (
      <div className="homePageLinks">
        <Link className="links" to="/"> <p>Home</p> </Link>
        <Link className="links" to="/login"> <p>Login</p> </Link>
        <Link className="links" to="/signup"> <p>Signup</p> </Link>
      </div>
    )
    
  )
}

export default NavigationBar