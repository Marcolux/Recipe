"use strict";
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
exports.api_service = void 0;
const axios_1 = __importDefault(require("axios"));
class API_service {
    constructor() {
        // ___________GET RECIPE FROM NAME____________________________
        this.get_recipe_from_name = (input) => __awaiter(this, void 0, void 0, function* () {
            let recipeName = input;
            const options = {
                method: "GET",
                url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search",
                params: {
                    query: recipeName,
                    number: 40
                },
                headers: {
                    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                    "x-rapidapi-key": "726fa2a7c2mshe40ce585ef7e075p1df5c9jsn1aac5454b25e",
                },
            };
            const response = yield axios_1.default.request(options);
            return response.data;
        });
        // _______________________________________________________________
        //_______ function to get a recipe from ingredients:_____________
        this.get_recipe_from_ingredients = (input) => __awaiter(this, void 0, void 0, function* () {
            let ingredientsFromBody = input;
            const options = {
                method: "GET",
                url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients",
                params: {
                    ingredients: ingredientsFromBody,
                    number: "90",
                    ignorePantry: "true",
                    ranking: "1",
                },
                headers: {
                    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                    "x-rapidapi-key": "726fa2a7c2mshe40ce585ef7e075p1df5c9jsn1aac5454b25e",
                },
            };
            const response = yield axios_1.default.request(options);
            return response.data;
        });
        this.all_the_info = (recipeId) => __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: "GET",
                url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`,
                headers: {
                    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                    "x-rapidapi-key": "726fa2a7c2mshe40ce585ef7e075p1df5c9jsn1aac5454b25e",
                },
            };
            const response = yield axios_1.default.request(options);
            return response.data;
        });
    }
}
exports.api_service = new API_service();
