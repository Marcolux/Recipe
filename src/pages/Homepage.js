// import link to navigate to signup and login page
import { Link } from "react-router-dom";
import HomePageBody from "../components/HomePageBody"


import image from "../img/AdobeStock_265201895.jpeg"; 

const Homepage = ()=>{
    return (
        <div className="HomePage">
            <img className="homepageBanner" src={image}/>
            <h1>My Recipe Collection</h1>
            <h2><Link to='/signup'>Signup</Link> To Start Your Recipe Collection</h2>
            <h2>Or Login From <Link to='/login'>Here</Link></h2>
            <HomePageBody/>
        </div>
    )

}

export default Homepage