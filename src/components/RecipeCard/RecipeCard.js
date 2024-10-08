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
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Context_1 = require("../../context/Context");
const RecipeCard = (props) => {
    const context = (0, react_1.useContext)(Context_1.Context);
    if (!context)
        throw new Error('useContext must be used within a Provider');
    const { recipeIdState } = context;
    const [recipeId, setRecipeId] = recipeIdState;
    return (react_1.default.createElement("div", { className: "singleResult" },
        react_1.default.createElement("div", { className: "imgCont" },
            react_1.default.createElement("img", { src: `${props.image}`, alt: "" })),
        react_1.default.createElement(react_router_dom_1.Link, { to: `/recipe/${props.id}`, onClick: () => {
                setRecipeId(props.id);
            } }, props.title)));
};
exports.default = RecipeCard;
