"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
//using context to pass the user informations between components
const react_2 = require("react");
const Context_1 = require("../context/Context");
// axios for the call to the backend
const axios_1 = __importDefault(require("axios"));
// env to switch between the local/heroku adresses
const react_dotenv_1 = __importDefault(require("react-dotenv"));
const assorted_jpg_1 = __importDefault(require("../img/assorted.jpg"));
// I need to show the navigation bar in this page so I import it
const NavigationBar_1 = __importDefault(require("../components/NavigationBar"));
const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};
const Signup = () => {
    const { userState } = (0, react_2.useContext)(Context_1.Context);
    const [user, setUser] = userState;
    // setting the info using useState for the call to the backend to create a user in users table
    const [email, setEmail] = (0, react_1.useState)("");
    const [name, setName] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    //function to create a user in the backend database
    const signupForm = (e) => {
        // prevent to clear the form
        console.log(react_dotenv_1.default.BACKEND_URL);
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        e.preventDefault();
        // call to the the backend
        axios_1.default
            .post(`${react_dotenv_1.default.BACKEND_URL}/user/`, { name, email, password })
            .then((response) => {
            //  checking the response to see if the email is already taken
            if (response.data.newUser) {
                // if we have successfully created the new user than we can store it in localstorage and useContext
                localStorage.setItem("userId", response.data.newUser.id);
                setUser(response.data.newUser);
            }
            else {
                // if it's already taken send an alert message
                alert(response.data.err.errors[0].message);
            }
        });
    };
    return (<div className="AuthPage">
      <NavigationBar_1.default />
      <form className="AuthForm" onSubmit={signupForm}>
        <div className="subAuthForm">
          <div className="formInput">
            <label htmlFor="name" id="userName">
              User Name:
            </label>
            {/* useState to temporary storage the info for the call to the backend */}
            <input value={name} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className="formInput">
            <label htmlFor="email"> Email: </label>
            {/* useState to temporary storage the info for the call to the backend */}
            <input value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="formInput">
            <label htmlFor="password"> Password: </label>
            {/* useState to temporary storage the info for the call to the backend */}
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="formInput">
            <input className="formButton" type="submit" value="Signup"/>
          </div>
        </div>
      </form>
      <div className="SomeDecoration"> </div>
      <assorted_jpg_1.default className="FormBottomBanner" src={assorted_jpg_1.default}/>
      {/* <div className="NavigateHome"> */}
    </div>);
};
exports.default = Signup;
