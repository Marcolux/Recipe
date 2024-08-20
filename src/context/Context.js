"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = exports.Context = void 0;
const react_1 = require("react");
const Context = (0, react_1.createContext)();
exports.Context = Context;
const Provider = ({ children }) => {
    const [user, setUser] = (0, react_1.useState)({});
    const [recipeId, setUserId] = (0, react_1.useState)();
    const [recipeImage, setRecipeImage] = (0, react_1.useState)("");
    const [SingleRecipePage, setSingleRecipePage] = (0, react_1.useState)(false);
    const [recipeDetails, setRecipeDetails] = (0, react_1.useState)({});
    const [categId, setCategId] = (0, react_1.useState)();
    const [results, setResults] = (0, react_1.useState)([]);
    const [categoryName, setCategoryName] = (0, react_1.useState)();
    const [allRecipes, setAllRecipes] = (0, react_1.useState)([]);
    const [alert, setAlert] = (0, react_1.useState)(false);
    const state = {
        userState: [user, setUser],
        recipeIdState: [recipeId, setUserId],
        recipeImageState: [recipeImage, setRecipeImage],
        SingleRecipePageState: [SingleRecipePage, setSingleRecipePage],
        recipeDetailsState: [recipeDetails, setRecipeDetails],
        categIdState: [categId, setCategId],
        resultsState: [results, setResults],
        categoryNameState: [categoryName, setCategoryName],
        allRecipesState: [allRecipes, setAllRecipes],
        alertState: [alert, setAlert],
    };
    return <Context.Provider value={state}>{children}</Context.Provider>;
};
exports.Provider = Provider;
