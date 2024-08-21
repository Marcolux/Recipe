"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
//using context to pass the user informations between components
const react_2 = require("react");
const Context_1 = require("../context/Context");
// axios for the call to the backend
const axios_1 = __importDefault(require("axios"));
// env to switch between the local/heroku adresses
const react_dotenv_1 = __importDefault(require("react-dotenv"));
// I need to show the navigation bar in this page so I import it
const NavigationBar_1 = __importDefault(require("../components/navigation-bar/NavigationBar"));
const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};
const Signup = () => {
    const context = (0, react_2.useContext)(Context_1.Context);
    if (!context)
        throw new Error('useContext must be used within a Provider');
    const { userState } = context;
    const [user, setUser] = userState;
    // setting the info using useState for the call to the backend to create a user in users table
    const [email, setEmail] = (0, react_1.useState)("");
    const [name, setName] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    //function to create a user in the backend database
    const signupForm = (e) => {
        // prevent to clear the form
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
    return (react_1.default.createElement("div", { className: "AuthPage" },
        react_1.default.createElement(NavigationBar_1.default, null),
        react_1.default.createElement("form", { className: "AuthForm", onSubmit: signupForm },
            react_1.default.createElement("div", { className: "subAuthForm" },
                react_1.default.createElement("div", { className: "formInput" },
                    react_1.default.createElement("label", { htmlFor: "name", id: "userName" }, " User Name: "),
                    react_1.default.createElement("input", { id: "name", value: name, onChange: (e) => setName(e.target.value) })),
                react_1.default.createElement("div", { className: "formInput" },
                    react_1.default.createElement("label", { htmlFor: "email" }, " Email: "),
                    react_1.default.createElement("input", { id: "email", value: email, onChange: (e) => setEmail(e.target.value) })),
                react_1.default.createElement("div", { className: "formInput" },
                    react_1.default.createElement("label", { htmlFor: "password" }, " Password: "),
                    react_1.default.createElement("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value) })),
                react_1.default.createElement("div", { className: "formInput" },
                    react_1.default.createElement("input", { className: "formButton", type: "submit", value: "Signup" })))),
        react_1.default.createElement("div", { className: "SomeDecoration" }, " ")));
};
exports.default = Signup;
