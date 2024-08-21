import React, { useState } from "react";

//using context to pass the user informations between components
import { useContext } from "react";
import { Context } from "../context/Context";

// axios for the call to the backend
import axios from "axios";
// env to switch between the local/heroku adresses
import env from "react-dotenv";

// I need to show the navigation bar in this page so I import it
import NavigationBar from "../components/navigation-bar/NavigationBar";

const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const Signup = () => {
  const context = useContext(Context)
  if (!context) throw new Error('useContext must be used within a Provider')

  const { userState } = context;
  const [user, setUser] = userState;

  // setting the info using useState for the call to the backend to create a user in users table
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  //function to create a user in the backend database
  const signupForm = (e: React.FormEvent<HTMLFormElement>) => {
    // prevent to clear the form

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    e.preventDefault();
    // call to the the backend
    axios
      .post(`${env.BACKEND_URL}/user/`, { name, email, password })
      .then((response) => {
        //  checking the response to see if the email is already taken
        if (response.data.newUser) {
          // if we have successfully created the new user than we can store it in localstorage and useContext
          localStorage.setItem("userId", response.data.newUser.id);
          setUser(response.data.newUser);
        } else {
          // if it's already taken send an alert message
            alert(response.data.err.errors[0].message)
        }
      });
  };
  return (
    
    <div className="AuthPage">
      <NavigationBar />
      <form className="AuthForm" onSubmit={signupForm}>
        <div className="subAuthForm">
          <div className="formInput">
            <label htmlFor="name" id="userName"> User Name: </label>
            {/* useState to temporary storage the info for the call to the backend */}
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="formInput">
            <label htmlFor="email"> Email: </label>
            {/* useState to temporary storage the info for the call to the backend */}
            <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="formInput">
            <label htmlFor="password"> Password: </label>
            {/* useState to temporary storage the info for the call to the backend */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="formInput">
            <input className="formButton" type="submit" value="Signup" />
          </div>
        </div>
      </form>
      <div className="SomeDecoration"> </div>
      {/* <div className="NavigateHome"> */}
    </div>
  );
};

export default Signup;
