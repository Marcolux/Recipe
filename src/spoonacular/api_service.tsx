import axios, {Method} from "axios"

interface Options  {

  method: Method;
  url: string;
  params: {
    query: string;
    number: number;
  };
  headers: {
    "x-rapidapi-host": string;
    "x-rapidapi-key": string;
  }
}

interface OptionsFromIngred  {
  method: Method;
  url: string;
  params: {
      ingredients: string;
      number: string;
      ignorePantry: string;
      ranking: string;
  };
  headers: {
      "x-rapidapi-host": string;
      "x-rapidapi-key": string;
  }
}
interface OptionsGeneric  {
  method: Method;
  url: string;
  headers: {
      "x-rapidapi-host": string;
      "x-rapidapi-key": string;
  }
}

class API_service {

    // ___________GET RECIPE FROM NAME____________________________
    get_recipe_from_name = async (input: string) => {
      let recipeName = input
  
      const options: Options = {
        method: "GET",
        url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search",
        params: { 
          query: recipeName,
          number: 40 
        },
        headers: {
          "x-rapidapi-host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "x-rapidapi-key": "726fa2a7c2mshe40ce585ef7e075p1df5c9jsn1aac5454b25e",
        },
      }
       
      const response = await axios.request(options)
      return response.data
    }
    // _______________________________________________________________
  
    //_______ function to get a recipe from ingredients:_____________
    get_recipe_from_ingredients = async (input: string) => {
      let ingredientsFromBody = input;
  
      const options: OptionsFromIngred = {
        method: "GET",
        url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients",
        params: {
          ingredients: ingredientsFromBody,
          number: "90",
          ignorePantry: "true",
          ranking: "1",
        },
        headers: {
          "x-rapidapi-host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "x-rapidapi-key": "726fa2a7c2mshe40ce585ef7e075p1df5c9jsn1aac5454b25e",
        },
      }
      
      const response = await axios.request(options)
      return response.data

    }

    all_the_info = async (recipeId: number) => {
      const options: OptionsGeneric = {
        method: "GET",
        url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`,
        headers: {
          "x-rapidapi-host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "x-rapidapi-key": "726fa2a7c2mshe40ce585ef7e075p1df5c9jsn1aac5454b25e",
        },
      };
  
      const response = await axios.request(options)
      return response.data

    }

}

export const api_service = new API_service()