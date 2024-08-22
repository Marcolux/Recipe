// import link to navigate to signup and login page
import React, {useContext} from "react";
import { Link } from "react-router-dom"
import { Context } from "../../context/Context";
import './style/hompage.css'
import '../../styles/variables/variables.css'


const Homepage = () => {
  const context = useContext(Context)
  if (!context) throw new Error('useContext must be used within a Provider')

  const { loginSignupState } = context;
  const [loginSignup, setLoginSignup] = loginSignupState;
  return (
    <div className="homePage">
      <div className="homepageBanner"></div>
      <h1>Welcome to Cuisine Cove</h1>
      <p className="mg-y-Lg">
        Discover, save, and organize your favorite recipes with ease using Cuisine Cove. Powered by the Spoonacular API, our app brings together a world of culinary inspiration right at your fingertips.
        Whether you're a seasoned chef or just starting in the kitchen, Cuisine Cove is designed to simplify your cooking experience. Easily search for new recipes, customize your meal plans, and create your personal digital cookbook by storing and organizing all your favorite dishes in one place.
        Start your culinary journey today with Cuisine Cove – the smart way to cook, organize, and enjoy food like never before.
      </p>

      <div className="flex mg-y-Xl">
        <button
          className="button light"
          onClick={() => {setLoginSignup('signup')}}
        >
          <Link to="/loginSignupPage"> Signup </Link> 
        </button>

        <button
          className="button dark"
          onClick={() => {setLoginSignup('login')}}
        >
          <Link to="/loginSignupPage"> Login </Link>
        </button>
      </div>
    </div>
  )
}

export default Homepage
