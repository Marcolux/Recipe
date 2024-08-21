"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import link to navigate to signup and login page
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
require("./style/hompage.css");
const Homepage = () => {
    return (react_1.default.createElement("div", { className: "homePage" },
        react_1.default.createElement("div", { className: "homepageBanner" }),
        react_1.default.createElement("h1", null, "Welcome to Cuisine Cove"),
        react_1.default.createElement("button", { className: "buttonLight" },
            react_1.default.createElement(react_router_dom_1.Link, { to: "/signup" }, " Signup "),
            " To Start Your Recipe Collection"),
        react_1.default.createElement("h2", null,
            "Or Login From ",
            react_1.default.createElement(react_router_dom_1.Link, { to: "/login" }, " Here "))));
};
exports.default = Homepage;
