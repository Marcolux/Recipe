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
const axios_1 = __importDefault(require("axios"));
const react_dotenv_1 = __importDefault(require("react-dotenv"));
const react_2 = require("react");
const Context_1 = require("../../context/Context");
const Login = () => {
    const context = (0, react_2.useContext)(Context_1.Context);
    if (!context)
        throw new Error('useContext must be used within a Provider');
    const { userState } = context;
    const [user, setUser] = userState;
    const { loginSignupState } = context;
    const [loginSignup, setLoginSignup] = loginSignupState;
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const loginForm = (e) => {
        e.preventDefault();
        axios_1.default
            .post(`${react_dotenv_1.default.BACKEND_URL}/user/login`, { email, password })
            .then((response) => {
            if (response.data.user) {
                localStorage.setItem("userId", response.data.user.id);
                setUser(response.data.user);
            }
            else {
                alert("wrong email address or password!");
            }
        });
    };
    return (react_1.default.createElement("div", { className: "signupLoginForm" },
        react_1.default.createElement("h1", { className: "mg-bt-Xl" }, "Login To Your Account"),
        react_1.default.createElement("form", { onSubmit: loginForm, className: "mg-t-Xl" },
            react_1.default.createElement("div", { className: "formInput mg-t-Xl" },
                react_1.default.createElement("label", { htmlFor: "email" }, "Email:"),
                react_1.default.createElement("input", { value: email, onChange: (e) => setEmail(e.target.value), required: true })),
            react_1.default.createElement("div", { className: "formInput mg-bt-Xl" },
                react_1.default.createElement("label", { htmlFor: "password" }, "Password:"),
                react_1.default.createElement("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true })),
            react_1.default.createElement("div", { className: "buttonsForm pd-t-Xl" },
                react_1.default.createElement("div", { className: "logSignCont" },
                    react_1.default.createElement("input", { className: "button dark mg-r-Lg", type: "submit", value: "Login" }),
                    react_1.default.createElement("p", { onClick: () => { setLoginSignup('signup'); } },
                        react_1.default.createElement("u", null, "Signup")))))));
};
exports.default = Login;
