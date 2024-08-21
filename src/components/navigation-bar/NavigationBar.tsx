import { Link, useNavigate } from "react-router-dom";

//using context to pass the user informations between components
import React, { useContext } from "react";
import { Context } from "../../context/Context";
import UserInNavBar from "../UserInNavbar";

import './style/navigationBar.css'

// export default NavigationBar
// export default NavigationBar
const NavigationBar = () => {
  const history = useNavigate()
  const context = useContext(Context)

  if (!context) throw new Error('useContext must be used within a Provider')
  
  
  const { userState } = context
  const [user, setUser] = userState
  
  return (
    
    localStorage.userId ? (
      <div className="navigationBar">
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
            setUser("");
          }}
        >
          logout
        </button>
        </div>
        
      // </div>
    ) : (
      <div className="homePageLinks navigationBar">
        <Link className="links" to="/"> <p>Home</p> </Link>
        <Link className="links" to="/login"> <p>Login</p> </Link>
        <Link className="links" to="/signup"> <p>Signup</p> </Link>
      </div>
    )
    
  )
}
export default NavigationBar