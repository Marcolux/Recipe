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
require("./style/loginSignup.css");
const Context_1 = require("../../context/Context");
const Signup_1 = __importDefault(require("../../components/SignupForm/Signup"));
const Login_1 = __importDefault(require("../../components/LoginForm/Login"));
const LoginSignupPage = () => {
    const context = (0, react_1.useContext)(Context_1.Context);
    if (!context)
        throw new Error('useContext must be used within a Provider');
    const { loginSignupState } = context;
    const [loginSignup, setLoginSignup] = loginSignupState;
    return (react_1.default.createElement("div", { className: "loginSignupPage" }, loginSignup === 'signup'
        ?
            react_1.default.createElement(Signup_1.default, null)
        :
            react_1.default.createElement(Login_1.default, null)));
};
exports.default = LoginSignupPage;
