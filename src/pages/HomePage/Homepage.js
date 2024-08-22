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
Object.defineProperty(exports, "__esModule", { value: true });
// import link to navigate to signup and login page
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Context_1 = require("../../context/Context");
require("./style/hompage.css");
require("../../styles/variables/variables.css");
const Homepage = () => {
    const context = (0, react_1.useContext)(Context_1.Context);
    if (!context)
        throw new Error('useContext must be used within a Provider');
    const { loginSignupState } = context;
    const [loginSignup, setLoginSignup] = loginSignupState;
    return (react_1.default.createElement("div", { className: "homePage" },
        react_1.default.createElement("div", { className: "homepageBanner" }),
        react_1.default.createElement("h1", null, "Welcome to Cuisine Cove"),
        react_1.default.createElement("p", { className: "mg-y-Lg" }, "Discover, save, and organize your favorite recipes with ease using Cuisine Cove. Powered by the Spoonacular API, our app brings together a world of culinary inspiration right at your fingertips. Whether you're a seasoned chef or just starting in the kitchen, Cuisine Cove is designed to simplify your cooking experience. Easily search for new recipes, customize your meal plans, and create your personal digital cookbook by storing and organizing all your favorite dishes in one place. Start your culinary journey today with Cuisine Cove \u2013 the smart way to cook, organize, and enjoy food like never before."),
        react_1.default.createElement("div", { className: "flex mg-y-Xl" },
            react_1.default.createElement("button", { className: "button light", onClick: () => { setLoginSignup('signup'); } },
                react_1.default.createElement(react_router_dom_1.Link, { to: "/loginSignupPage" }, " Signup ")),
            react_1.default.createElement("button", { className: "button dark", onClick: () => { setLoginSignup('login'); } },
                react_1.default.createElement(react_router_dom_1.Link, { to: "/loginSignupPage" }, " Login ")))));
};
exports.default = Homepage;
