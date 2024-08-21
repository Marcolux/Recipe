// import link to navigate to signup and login page
import React from "react";
import { Link } from "react-router-dom"
import './style/hompage.css'

const Homepage = () => {
  return (
    <div className="homePage">
      <div className="homepageBanner"></div>
      <h1>Welcome to Cuisine Cove</h1>
      <button
        className="buttonLight"
      >
        <Link to="/signup"> Signup </Link> To Start Your Recipe Collection
      </button>
      <h2>
        Or Login From <Link to="/login"> Here </Link>
      </h2>
    </div>
  )
}

export default Homepage
