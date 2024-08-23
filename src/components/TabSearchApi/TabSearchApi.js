"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./style/tab-search-api.css");
const TabSearchAPI = ({ tabSwitch }) => {
    const classList = tabSwitch === 'searchApi' ? 'pageContent searchApi active' : 'pageContent searchApi';
    const searchForm = () => {
        return (react_1.default.createElement("form", { className: "formApi", onSubmit: () => { } },
            react_1.default.createElement("p", { className: "searchLabel" }, "Search By"),
            react_1.default.createElement("select", { className: "searchInput mg-l-Xl", onChange: (e) => { } },
                react_1.default.createElement("option", null, "select the search criteria"),
                react_1.default.createElement("option", { value: "byName" }, "Recipe Name"),
                react_1.default.createElement("option", { value: "byIngredients" }, "Recipe Ingredients")),
            react_1.default.createElement("input", { className: "searchInput mg-x-Xl", value: "", onChange: (e) => { } }),
            react_1.default.createElement("button", { className: "button dark small" }, "Search")));
    };
    return (react_1.default.createElement("div", { className: classList },
        react_1.default.createElement("div", { className: "searchFromApiCont" },
            react_1.default.createElement("p", { className: "apiSearchHeader" }, "Search Recipes with Spoonacular API"),
            searchForm())));
};
exports.default = TabSearchAPI;
