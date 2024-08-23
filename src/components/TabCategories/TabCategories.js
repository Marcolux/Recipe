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
const react_dotenv_1 = __importDefault(require("react-dotenv"));
const axios_1 = __importDefault(require("axios"));
require("./style/tab-categories.css");
const CategoryButton_1 = __importDefault(require("./components/category-button/CategoryButton"));
const RemoveCategoryButton_1 = __importDefault(require("./components/remove-category/RemoveCategoryButton"));
const TabCategories = ({ tabSwitch }) => {
    const [createCategory, setCreateCategory] = (0, react_1.useState)(false);
    const [newCategoryName, setnewCategoryName] = (0, react_1.useState)("");
    const [categoriesUser, setCategoriesUser] = (0, react_1.useState)([]);
    const [categorySelected, setCategorySelected] = (0, react_1.useState)();
    const userId = localStorage.getItem("userId");
    const getCategories = () => {
        axios_1.default
            .get(`${react_dotenv_1.default.BACKEND_URL}/category/all/${userId}`)
            .then((response) => {
            setCategoriesUser(response.data);
        });
    };
    (0, react_1.useEffect)(getCategories, [createCategory]);
    const rederAllTheCategoryBtns = () => {
        if (categoriesUser.length > 0) {
            if (!categorySelected) {
                setCategorySelected(categoriesUser[0]);
            }
            return categoriesUser.map(cat => {
                const catName = cat.name;
                if (cat) {
                    return (react_1.default.createElement(CategoryButton_1.default, { key: catName, className: `categoryButton ${(categorySelected === null || categorySelected === void 0 ? void 0 : categorySelected.name) === catName ? 'active' : ''}`, categoryName: catName, onClick: () => { setCategorySelected(cat); } }));
                }
            });
        }
        return null;
    };
    const createNewCategory = () => {
        if (newCategoryName !== '') {
            console.log(newCategoryName);
            axios_1.default.post(`${react_dotenv_1.default.BACKEND_URL}/category/${userId}`, { categoryName: newCategoryName });
            setCreateCategory(false);
            setnewCategoryName("");
        }
        else {
            alert('New category cannot be empty');
        }
    };
    const removeCategory = () => {
        axios_1.default
            .delete(`${react_dotenv_1.default.BACKEND_URL}/category/${categorySelected === null || categorySelected === void 0 ? void 0 : categorySelected.id}`)
            .then(() => {
            getCategories();
            setCategorySelected(categoriesUser[0]);
        });
    };
    const showRecipesInCat = () => {
        let catName = categorySelected ? categorySelected.name : '';
        return (react_1.default.createElement("div", { className: "recipeInCat" },
            react_1.default.createElement("div", { className: "categoryHeader" },
                react_1.default.createElement("p", null, catName),
                react_1.default.createElement(RemoveCategoryButton_1.default, { id: "", categoryName: catName, className: "button dark", onClick: removeCategory })),
            react_1.default.createElement("div", { className: "allRecipes" })));
    };
    return (react_1.default.createElement("div", { className: tabSwitch === 'categories' ? 'pageContent categories active' : 'pageContent categories' },
        react_1.default.createElement("div", { className: "flex hg-100" },
            react_1.default.createElement("div", { className: "leftTabCat" }, rederAllTheCategoryBtns()),
            react_1.default.createElement("div", { className: "recipesCont" }, showRecipesInCat())),
        react_1.default.createElement("div", { className: "addCategorySec" }, !createCategory ?
            react_1.default.createElement("button", { className: "button dark small mg-y-Lg", onClick: () => {
                    setCreateCategory(true);
                    setnewCategoryName("");
                } }, " Add Category")
            :
                react_1.default.createElement("div", { className: "inputCategory flex mg-y-Sm" },
                    react_1.default.createElement("input", { type: "text", value: newCategoryName, onChange: (e) => { setnewCategoryName(e.target.value); } }),
                    react_1.default.createElement("button", { className: "button dark small mg-x-Sm", onClick: createNewCategory }, "Add"),
                    react_1.default.createElement("p", { onClick: () => { setCreateCategory(false); } }, "Cancel")))));
};
exports.default = TabCategories;
