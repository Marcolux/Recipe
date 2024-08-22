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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const react_dotenv_1 = __importDefault(require("react-dotenv"));
const Context_1 = require("../../context/Context");
const react_router_dom_1 = require("react-router-dom");
const fa_1 = require("react-icons/fa");
const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};
const Signup = () => {
    const context = (0, react_1.useContext)(Context_1.Context);
    if (!context)
        throw new Error('useContext must be used within a Provider');
    const { userState } = context;
    const [user, setUser] = userState;
    const { loginSignupState } = context;
    const [loginSignup, setLoginSignup] = loginSignupState;
    const [email, setEmail] = (0, react_1.useState)("");
    const [name, setName] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [showEmailMsg, setShowEmailMsg] = (0, react_1.useState)(false);
    const signupForm = (e) => __awaiter(void 0, void 0, void 0, function* () {
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        e.preventDefault();
        const response = yield axios_1.default.post(`${react_dotenv_1.default.BACKEND_URL}/user/checkEmail`, { email });
        console.log(response);
        if (!response.data.exists) {
            const response = yield axios_1.default.post(`${react_dotenv_1.default.BACKEND_URL}/user/`, { name, email, password });
            if (response.data.newUser) {
                localStorage.setItem("userId", response.data.newUser.id);
                setUser(response.data.newUser);
            }
        }
        else {
            setShowEmailMsg(true);
        }
    });
    return (react_1.default.createElement("div", { className: "signupLoginForm" },
        react_1.default.createElement("h1", null, "Create a New Account"),
        react_1.default.createElement("form", { onSubmit: signupForm },
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", { className: "formInput" },
                    react_1.default.createElement("label", { htmlFor: "name", id: "userName" }, " User Name: "),
                    react_1.default.createElement("input", { id: "name", value: name, onChange: (e) => setName(e.target.value) })),
                react_1.default.createElement("div", { className: "formInput" },
                    react_1.default.createElement("label", { htmlFor: "email" }, " Email: "),
                    react_1.default.createElement("input", { id: "email", className: showEmailMsg ? 'error' : '', value: email, onChange: (e) => setEmail(e.target.value) }),
                    showEmailMsg ?
                        react_1.default.createElement("p", { className: "error" }, "Email already in use, Please select a different address")
                        : null),
                react_1.default.createElement("div", { className: "formInput" },
                    react_1.default.createElement("label", { htmlFor: "password" }, " Password: "),
                    react_1.default.createElement("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value) })),
                react_1.default.createElement("div", { className: "formInput" },
                    react_1.default.createElement("label", { htmlFor: "password" }, " Confirm Password: "),
                    react_1.default.createElement("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value) })),
                react_1.default.createElement("div", { className: "buttonsForm" },
                    react_1.default.createElement(react_router_dom_1.Link, { className: "loginLink", to: '/' },
                        react_1.default.createElement(fa_1.FaArrowLeft, { className: "mg-r-Sm" }),
                        "Back"),
                    react_1.default.createElement("div", { className: "logSignCont" },
                        react_1.default.createElement("input", { className: "button dark", type: "submit", value: "Signup" }),
                        react_1.default.createElement("p", { onClick: () => {
                                setLoginSignup('login');
                            } },
                            react_1.default.createElement("u", null, "Login")))))),
        react_1.default.createElement("div", { className: "SomeDecoration" }, " ")));
};
exports.default = Signup;
