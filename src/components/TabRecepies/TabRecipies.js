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
const Context_1 = require("../../context/Context");
const axios_1 = __importDefault(require("axios"));
const react_dotenv_1 = __importDefault(require("react-dotenv"));
const RecipeCard_1 = __importDefault(require("../RecipeCard/RecipeCard"));
require("./style/tab-recepies.css");
const TabRecipies = ({ tabSwitch }) => {
    const context = (0, react_1.useContext)(Context_1.Context);
    if (!context)
        throw new Error('useContext must be used within a Provider');
    const [allRecipes, setAllRecipes] = (0, react_1.useState)([]);
    const { userState } = context;
    const [user] = userState;
    (0, react_1.useEffect)(() => {
        if (tabSwitch === 'recipies') {
            axios_1.default.get(`${react_dotenv_1.default.BACKEND_URL}/recipe/all/${user.id}`).then((response) => {
                setAllRecipes(response.data);
            });
        }
    }, [tabSwitch]);
    const showAllRecipes = () => {
        if (allRecipes.length > 0) {
            return allRecipes.map((recipe) => (react_1.default.createElement(RecipeCard_1.default, { key: recipe.apiId, id: Number(recipe.apiId), image: recipe.picture, title: recipe.name })));
        }
        else {
            return react_1.default.createElement("div", null, "No recipes found.");
        }
    };
    return (react_1.default.createElement("div", { className: tabSwitch === 'recipies' ? 'pageContent recipies active' : 'pageContent recipies' },
        react_1.default.createElement("div", null, "Recipies"),
        react_1.default.createElement("div", { className: "recipiesContainer" }, tabSwitch === 'recipies' ? showAllRecipes() : null)));
};
exports.default = TabRecipies;
