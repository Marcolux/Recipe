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
const Context_1 = require("../../context/Context");
const RecipeCard_1 = __importDefault(require("../RecipeCard/RecipeCard"));
const api_service_1 = require("../../spoonacular/api_service");
require("./style/tab-search-api.css");
const TabSearchAPI = ({ tabSwitch }) => {
    const classList = tabSwitch === 'searchApi' ? 'pageContent searchApi active' : 'pageContent searchApi';
    const [searchString, setSearchString] = (0, react_1.useState)('');
    const context = (0, react_1.useContext)(Context_1.Context);
    if (!context)
        throw new Error('useContext must be used within a Provider');
    const { researchTypeState, researchResultsByIngreState, researchResultsByNameState } = context;
    const [researchType, setResearchType] = researchTypeState;
    const [researchResultsByName, setResearchResultsByName] = researchResultsByNameState;
    const [researchResultsByIngre, setResearchResultsByIngreState] = researchResultsByIngreState;
    const populateResultsRecipeName = () => {
        if (researchResultsByName && researchResultsByName.results.length > 0) {
            return (react_1.default.createElement(react_1.default.Fragment, null, researchResultsByName.results.map((result) => (result.image && result.sourceUrl.includes('https://www.foodista.com/') ?
                react_1.default.createElement(RecipeCard_1.default, { key: result.id, id: result.id, image: `${researchResultsByName.baseUri}${result.image}`, title: result.title })
                :
                    null))));
        }
        else if (researchResultsByName && researchResultsByName.results.length === 0) {
            return react_1.default.createElement("p", null, "No results found.");
        }
        else {
            return react_1.default.createElement(react_1.default.Fragment, null);
        }
    };
    const populateResultsByIngredients = () => {
        if (researchResultsByIngre.length > 0) {
            return (react_1.default.createElement(react_1.default.Fragment, null, researchResultsByIngre.map((result) => (result.image ?
                react_1.default.createElement(RecipeCard_1.default, { key: result.id, id: result.id, image: result.image, title: result.title })
                :
                    null))));
        }
        else if (researchResultsByIngre.length === 0) {
            return react_1.default.createElement("p", null, "No results found.");
        }
        else {
            return react_1.default.createElement(react_1.default.Fragment, null);
        }
    };
    const searchForm = () => {
        return (react_1.default.createElement("form", { className: "formApi", onSubmit: handleSubmit },
            react_1.default.createElement("p", { className: "searchLabel" }, "Search By"),
            react_1.default.createElement("select", { className: "searchInput mg-l-Xl", value: researchType, onChange: (e) => {
                    // e.preventDefault()
                    setResearchType(e.target.value);
                } },
                react_1.default.createElement("option", null, "select the search criteria"),
                react_1.default.createElement("option", { value: "byName" }, "Recipe Name"),
                react_1.default.createElement("option", { value: "byIngredients" }, "Recipe Ingredients")),
            react_1.default.createElement("input", { className: "searchInput mg-x-Xl", value: searchString, onChange: (e) => { setSearchString(e.target.value); } }),
            react_1.default.createElement("button", { className: "button dark small", type: "submit" }, "Search")));
    };
    const searchFromIngredients = () => __awaiter(void 0, void 0, void 0, function* () {
        const results = yield api_service_1.api_service.get_recipe_from_ingredients(searchString);
        setResearchResultsByIngreState(results);
    });
    const searchFromName = () => __awaiter(void 0, void 0, void 0, function* () {
        const results = yield api_service_1.api_service.get_recipe_from_name(searchString);
        setResearchResultsByName(results);
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        researchType === 'byName' ? searchFromName() : searchFromIngredients();
    };
    return (react_1.default.createElement("div", { className: classList },
        react_1.default.createElement("div", { className: "searchFromApiCont" },
            react_1.default.createElement("p", { className: "apiSearchHeader" }, "Search Recipes with Spoonacular API"),
            searchForm(),
            react_1.default.createElement("div", { className: "singleResultsContainer" }, researchType === 'byName'
                ?
                    populateResultsRecipeName()
                :
                    populateResultsByIngredients()))));
};
exports.default = TabSearchAPI;
