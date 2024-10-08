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
const react_router_dom_1 = require("react-router-dom");
const Context_1 = require("../../context/Context");
const axios_1 = __importDefault(require("axios"));
const react_dotenv_1 = __importDefault(require("react-dotenv"));
const api_service_1 = require("../../spoonacular/api_service");
const SingleRecipePage = () => {
    var _a, _b;
    let history = (0, react_router_dom_1.useNavigate)();
    const context = (0, react_1.useContext)(Context_1.Context);
    if (!context)
        throw new Error('useContext must be used within a Provider');
    const { recipeIdState, recipeImageState, recipeDetailsState, tabSwitchState } = context;
    const [recipeId, setRecipeId] = recipeIdState;
    const [recipeDetails, setRecipeDetails] = recipeDetailsState;
    const userId = localStorage.getItem("userId");
    (0, react_1.useEffect)(() => {
        const fetchRecipeDetails = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const details = yield api_service_1.api_service.all_the_info(Number(recipeId));
                setRecipeDetails(details);
            }
            catch (error) {
                console.error("Failed to fetch recipe details:", error);
            }
        });
        fetchRecipeDetails();
    }, [recipeId]);
    const saveRecipe = () => {
        axios_1.default.post(`${react_dotenv_1.default.BACKEND_URL}/recipe/${userId} `, {
            apiId: recipeDetails.id,
            ingredients: ingred.toString(),
            instructions: recipeDetails.summary,
            picture: recipeDetails.image,
            name: recipeDetails.title,
            diets: dietS.toString(),
        });
    };
    console.log(recipeDetails);
    let dietS = [];
    let ingred = [];
    return (react_1.default.createElement(react_1.default.Fragment, null, recipeDetails &&
        recipeDetails.title &&
        recipeDetails.image ? (react_1.default.createElement("div", { className: "SingleRecipe" },
        react_1.default.createElement("h3", { className: "recipeTitle" }, recipeDetails.title),
        react_1.default.createElement("div", { className: "singleRecipeButtons" },
            react_1.default.createElement("button", { onClick: () => {
                    history(`/user-page`);
                    setRecipeDetails({});
                } }, "Back to Search"),
            react_1.default.createElement("button", { onClick: saveRecipe }, "Add to Your Recipes")),
        react_1.default.createElement("div", { className: "diet-Ingredients" },
            react_1.default.createElement("img", { src: `${recipeDetails.image}`, alt: "" }),
            react_1.default.createElement("div", { className: "RecipeIngredients" },
                react_1.default.createElement("h3", null, "Ingredients lists:"),
                react_1.default.createElement("ul", null, ((_a = recipeDetails.extendedIngredients) === null || _a === void 0 ? void 0 : _a.map((ingredient, i) => {
                    ingred.push(ingredient.name);
                    return react_1.default.createElement("li", { key: i }, ingredient.name);
                })) || react_1.default.createElement("li", null, "No ingredients available"))),
            react_1.default.createElement("div", { className: "RecipeDiets" },
                react_1.default.createElement("h3", null, "Diets:"),
                react_1.default.createElement("ul", null, ((_b = recipeDetails.diets) === null || _b === void 0 ? void 0 : _b.map((diet, i) => {
                    dietS.push(diet);
                    return react_1.default.createElement("li", { key: i }, diet);
                })) || react_1.default.createElement("li", null, "No diets available")))),
        react_1.default.createElement("div", { className: "RecipeInstructions" },
            react_1.default.createElement("h3", null, "Instructions:"),
            recipeDetails.instructions ?
                react_1.default.createElement("p", { dangerouslySetInnerHTML: { __html: recipeDetails.instructions } })
                :
                    react_1.default.createElement("p", { dangerouslySetInnerHTML: { __html: recipeDetails.summary } })))) : (react_1.default.createElement("div", { className: "spin" }))));
};
exports.default = SingleRecipePage;
