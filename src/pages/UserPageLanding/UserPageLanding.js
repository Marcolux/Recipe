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
require("./style/user-page.css");
const TabCategories_1 = __importDefault(require("../../components/TabCategories/TabCategories"));
const TabRecepies_1 = __importDefault(require("../../components/TabRecepies/TabRecepies"));
const TabSearchApi_1 = __importDefault(require("../../components/TabSearchApi/TabSearchApi"));
const UserPageLanding = () => {
    const [tabSwitch, setTabSwitch] = (0, react_1.useState)('categories');
    const renderComponent = () => {
        switch (tabSwitch) {
            case 'categories':
                return react_1.default.createElement(TabCategories_1.default, null);
            case 'recepies':
                return react_1.default.createElement(TabRecepies_1.default, null);
            case 'searchApi':
                return react_1.default.createElement(TabSearchApi_1.default, null);
            default:
                return react_1.default.createElement(TabCategories_1.default, null);
        }
    };
    return (react_1.default.createElement("div", { className: "userPageLanding" },
        react_1.default.createElement("div", { className: "navTabs" },
            react_1.default.createElement("button", { className: "tabsUserLanding", onClick: (e) => { setTabSwitch('categories'); } }, " Categories"),
            react_1.default.createElement("button", { className: "tabsUserLanding", onClick: (e) => { setTabSwitch('recepies'); } }, "All Your Recepies"),
            react_1.default.createElement("button", { className: "tabsUserLanding", onClick: (e) => { setTabSwitch('searchApi'); } }, " Search From Spoonacular")),
        react_1.default.createElement("div", { className: "flex hg-100" }, renderComponent())));
};
exports.default = UserPageLanding;
