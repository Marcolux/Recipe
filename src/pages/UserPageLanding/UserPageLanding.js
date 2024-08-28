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
const react_router_dom_1 = require("react-router-dom");
require("./style/user-page.css");
const Context_1 = require("../../context/Context");
const TabCategories_1 = __importDefault(require("../../components/TabCategories/TabCategories"));
const TabRecipies_1 = __importDefault(require("../../components/TabRecepies/TabRecipies"));
const TabSearchApi_1 = __importDefault(require("../../components/TabSearchApi/TabSearchApi"));
const UserPageLanding = () => {
    const history = (0, react_router_dom_1.useNavigate)();
    const context = (0, react_1.useContext)(Context_1.Context);
    if (!context)
        throw new Error('useContext must be used within a Provider');
    const { userState, tabSwitchState } = context;
    const [user, setUser] = userState;
    const [tabSwitch, setTabSwitch] = tabSwitchState;
    const renderComponent = () => {
        switch (tabSwitch) {
            case 'categories':
                return react_1.default.createElement(TabCategories_1.default, { tabSwitch: 'categories' });
            case 'recipies':
                return react_1.default.createElement(TabRecipies_1.default, { tabSwitch: 'recipies' });
            case 'searchApi':
                return react_1.default.createElement(TabSearchApi_1.default, { tabSwitch: 'searchApi' });
            default:
                return react_1.default.createElement(TabCategories_1.default, { tabSwitch: 'categories' });
        }
    };
    return (react_1.default.createElement("div", { className: "userPageLanding" },
        react_1.default.createElement("div", { className: "navTabs" },
            react_1.default.createElement("div", { className: "headerUserPage" },
                react_1.default.createElement("h1", { className: "" },
                    user.name,
                    " Cookbook"),
                react_1.default.createElement("button", { className: "button light small mg-r-Lg text-bold", onClick: () => {
                        localStorage.removeItem("userId");
                        history("/");
                        setUser("");
                    } }, "Logout")),
            react_1.default.createElement("div", { className: "flex" },
                react_1.default.createElement("button", { className: tabSwitch === 'categories' ? ' active' : '', onClick: (e) => { setTabSwitch('categories'); } }, " Categories"),
                react_1.default.createElement("button", { className: tabSwitch === 'recipies' ? 'active' : '', onClick: (e) => { setTabSwitch('recipies'); } }, "All Your Recipies"),
                react_1.default.createElement("button", { className: tabSwitch === 'searchApi' ? 'active' : '', onClick: (e) => { setTabSwitch('searchApi'); } }, " Search From Spoonacular"))),
        renderComponent()));
};
exports.default = UserPageLanding;
