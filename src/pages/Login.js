import { useState } from "react";
// axios for the call to the backend
import axios from "axios";
// env to switch between the adresses
import env from "react-dotenv";

// I need to show the navigation bar in this page so I import it
import NavigationBar from "../components/navigation-bar/NavigationBar";

//using context to pass the user informations between components
import { useContext } from "react";
import { Context } from "../context/Context";

import img from "../img/assorted.jpg";

const Login = () => {
  const { userState } = useContext(Context);
  const [user, setUser] = userState;
  // setting the info for the call to the backend
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //function to "fetch" a user in the backend database
  const loginForm = (e) => {
    e.preventDefault();
    axios
      .post(`${env.BACKEND_URL}/user/login`, { email, password })
      .then((response) => {
        //  console.log(response.data)
        // checking if we have a positive response
        if (response.data.user) {
          //if we have it let's set the userId in localstorage
          localStorage.setItem("userId", response.data.user.id);
          //and set user in context
          setUser(response.data.user);
        } else {
          // if not send an alert
          alert("wrong email address or password!");
        }
      });
  };

  return (
    <div className="AuthPage">
      <NavigationBar />
      {/* login form */}
      <form className="AuthForm" onSubmit={loginForm}>
        <div className="subAuthForm">
          <div className="formInput">
            <label htmlFor="email">Email:</label>
            {/* using useState to save the info I need for the call to the backend */}
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="formInput">
            <label htmlFor="password">Password:</label>
            {/* using useState to save the info I need for the call to the backend */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="formInput">
            <input className="formButton" type="submit" value="Log In" />
          </div>
        </div>
      </form>
      <img className="FormBottomBanner" src={img} />
    </div>
  );
};

export default Login;
