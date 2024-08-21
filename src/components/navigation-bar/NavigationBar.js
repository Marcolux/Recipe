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
const react_router_dom_1 = require("react-router-dom");
//using context to pass the user informations between components
const react_1 = __importStar(require("react"));
const Context_1 = require("../../context/Context");
const UserInNavbar_1 = __importDefault(require("../UserInNavbar"));
require("./style/navigationBar.css");
// export default NavigationBar
// export default NavigationBar
const NavigationBar = () => {
    const history = (0, react_router_dom_1.useNavigate)();
    const context = (0, react_1.useContext)(Context_1.Context);
    if (!context)
        throw new Error('useContext must be used within a Provider');
    const { userState } = context;
    const [user, setUser] = userState;
    return (localStorage.userId ? (react_1.default.createElement("div", { className: "navigationBar" },
        react_1.default.createElement(UserInNavbar_1.default, null),
        react_1.default.createElement(react_router_dom_1.Link, { className: "links", to: "/search-recipe" },
            react_1.default.createElement("p", null, "Search")),
        react_1.default.createElement("button", { className: "button-orange mr-20", onClick: () => {
                localStorage.removeItem("userId");
                history("/");
                setUser("");
            } }, "logout"))
    // </div>
    ) : (react_1.default.createElement("div", { className: "homePageLinks navigationBar" },
        react_1.default.createElement(react_router_dom_1.Link, { className: "links", to: "/" },
            " ",
            react_1.default.createElement("p", null, "Home"),
            " "),
        react_1.default.createElement(react_router_dom_1.Link, { className: "links", to: "/login" },
            " ",
            react_1.default.createElement("p", null, "Login"),
            " "),
        react_1.default.createElement(react_router_dom_1.Link, { className: "links", to: "/signup" },
            " ",
            react_1.default.createElement("p", null, "Signup"),
            " "))));
};
exports.default = NavigationBar;
