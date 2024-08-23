import axios from "axios";

export const API_service = () => {

    // ___________GET RECIPE FROM NAME____________________________
    const get_recipe_from_name = (input) => {
      let recipeName = input
  
      const options = {
        method: "GET",
        url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search",
        params: { query: recipeName },
        headers: {
          "x-rapidapi-host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "x-rapidapi-key": "726fa2a7c2mshe40ce585ef7e075p1df5c9jsn1aac5454b25e",
        },
      }
  
      axios
        .request(options)
        .then(function (response) { return response })
        .catch(function (error) {
          console.error(error, "recipe not found")
        })
    }
    // _______________________________________________________________
  
    //_______ function to get a recipe from ingredients:_____________
    const get_recipe_from_ingredients = (input) => {
      let ingredientsFromBody = input;
  
      const options = {
        method: "GET",
        url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients",
        params: {
          ingredients: ingredientsFromBody,
          number: "27",
          ignorePantry: "true",
          ranking: "1",
        },
        headers: {
          "x-rapidapi-host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "x-rapidapi-key": "726fa2a7c2mshe40ce585ef7e075p1df5c9jsn1aac5454b25e",
        },
      };
  
      axios
        .request(options)
        .then(function (response) { return response})
        .catch(function (error) { console.error(error) })
    }
}