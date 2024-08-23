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
require("./style/tab-search-api.css");
// @ts-ignore
const api_service_1 = __importDefault(require("../../spoonacular/api_service"));
const TabSearchAPI = ({ tabSwitch }) => {
    const classList = tabSwitch === 'searchApi' ? 'pageContent searchApi active' : 'pageContent searchApi';
    const [searchString, setSearchString] = (0, react_1.useState)('');
    const searchForm = () => {
        return (react_1.default.createElement("form", { className: "formApi", onSubmit: () => { } },
            react_1.default.createElement("p", { className: "searchLabel" }, "Search By"),
            react_1.default.createElement("select", { className: "searchInput mg-l-Xl", onChange: (e) => { } },
                react_1.default.createElement("option", null, "select the search criteria"),
                react_1.default.createElement("option", { value: "byName" }, "Recipe Name"),
                react_1.default.createElement("option", { value: "byIngredients" }, "Recipe Ingredients")),
            react_1.default.createElement("input", { className: "searchInput mg-x-Xl", value: searchString, onChange: (e) => { setSearchString(e.target.value); } }),
            react_1.default.createElement("button", { className: "button dark small", onClick: () => { console.log(api_service_1.default.get_recipe_from_name(searchString)); } }, "Search")));
    };
    return (react_1.default.createElement("div", { className: classList },
        react_1.default.createElement("div", { className: "searchFromApiCont" },
            react_1.default.createElement("p", { className: "apiSearchHeader" }, "Search Recipes with Spoonacular API"),
            searchForm())));
};
exports.default = TabSearchAPI;
