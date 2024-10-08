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
exports.Provider = exports.Context = void 0;
const react_1 = __importStar(require("react"));
const Context = (0, react_1.createContext)(undefined);
exports.Context = Context;
const Provider = ({ children }) => {
    const [user, setUser] = (0, react_1.useState)({});
    const [loginSignup, setLoginSignup] = (0, react_1.useState)('');
    const [recipeId, setUserId] = (0, react_1.useState)(0);
    const [recipeImage, setRecipeImage] = (0, react_1.useState)("");
    const [SingleRecipePage, setSingleRecipePage] = (0, react_1.useState)(false);
    const [recipeDetails, setRecipeDetails] = (0, react_1.useState)({});
    const [categId, setCategId] = (0, react_1.useState)(undefined);
    const [results, setResults] = (0, react_1.useState)([]);
    const [categoryName, setCategoryName] = (0, react_1.useState)(undefined);
    const [allRecipes, setAllRecipes] = (0, react_1.useState)([]);
    const [alert, setAlert] = (0, react_1.useState)(false);
    const [researchType, setResearchType] = (0, react_1.useState)('');
    const [researchResultsByName, setResearchResultsByName] = (0, react_1.useState)(undefined);
    const [researchResultsByIngre, setResearchResultsByIngre] = (0, react_1.useState)([]);
    const [tabSwitch, setTabSwitch] = (0, react_1.useState)('categories');
    const state = {
        userState: [user, setUser],
        loginSignupState: [loginSignup, setLoginSignup],
        recipeIdState: [recipeId, setUserId],
        recipeImageState: [recipeImage, setRecipeImage],
        SingleRecipePageState: [SingleRecipePage, setSingleRecipePage],
        recipeDetailsState: [recipeDetails, setRecipeDetails],
        categIdState: [categId, setCategId],
        resultsState: [results, setResults],
        categoryNameState: [categoryName, setCategoryName],
        allRecipesState: [allRecipes, setAllRecipes],
        alertState: [alert, setAlert],
        researchTypeState: [researchType, setResearchType],
        researchResultsByNameState: [researchResultsByName, setResearchResultsByName],
        researchResultsByIngreState: [researchResultsByIngre, setResearchResultsByIngre],
        tabSwitchState: [tabSwitch, setTabSwitch]
    };
    return (react_1.default.createElement(Context.Provider, { value: state }, children));
};
exports.Provider = Provider;
