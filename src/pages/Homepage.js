import HomePageBody from "../components/HomePageBody"
import NavigationBar from "../components/NavigationBar"

const Homepage = ()=>{


return (
    <div className="HomePage">
        <NavigationBar/>
        <h3>This is the first Landing Page</h3>
        <HomePageBody/>
    </div>
)

}

export default Homepage