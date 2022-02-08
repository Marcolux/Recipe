import { Link } from "react-router-dom";
import HomePageBody from "../components/HomePageBody"
import NavigationBar from "../components/NavigationBar"
import image from "../img/AdobeStock_265201895.jpeg"; 

const Homepage = ()=>{


return (
    <div className="HomePage">
        {/* <NavigationBar/> */}
        <img className="homepageBanner" src={image}/>
        <h1>My Recipe Collection</h1>
        <h2><Link to='/signup'>Signup</Link> To Start Your Recipe Collection</h2>
        <h2>Or Login From <Link to='/login'>Here</Link></h2>
        <HomePageBody/>
    </div>
)

}

export default Homepage