import axios from "axios";

import env from "react-dotenv";

import React,  { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context/Context";

import { api_service } from "../../spoonacular/api_service";

const SingleRecipePage =  () => {
  const context = useContext(Context)
  if (!context) throw new Error('useContext must be used within a Provider')

  // const { recipeId } = useParams()

  const { recipeIdState } = context
  const [recipeId, setRecipeId] = recipeIdState

  const { recipeImageState } = context
  const [recipeImage, setRecipeImage] = recipeImageState

  const { SingleRecipePageState } = context
  const [SingleRecipePage, setSingleRecipePage] = SingleRecipePageState

  const { recipeDetailsState } = context
  const [recipeDetails, setRecipeDetails] = recipeDetailsState

  const userId = localStorage.getItem("userId")

  const recipe = async () => {
    const details = await api_service.all_the_info(Number(recipeId));
    setRecipeDetails(details);
    console.log(details); // Log the fetched details

   
  } 
  useEffect(() => {
    recipe()
  }, [])

  console.log(recipeDetails)

 

  let dietS: string[] = []
  let ingred: string[] = []

  return (
    <>
      {/* check that all the info are loaded if not we load the loading page */}
      {recipeDetails ? (
        <div className="SingleRecipe">
          <h3 className="recipeTitle">{recipeDetails.title}</h3>
          <div className="singleRecipeButtons">
            <button
              onClick={() => {
                setSingleRecipePage(false)
              }}
            >
              Back to Search
            </button>
            <button
              onClick={() => {
                // axios call to save the recipe in the backend database
                axios.post(`${env.BACKEND_URL}/recipe/${userId} `, {
                  apiId: recipeDetails.id,
                  ingredients: ingred.toString(),
                  instructions: recipeDetails.instructions,
                  picture: recipeImage,
                  name: recipeDetails.title,
                  diets: dietS.toString(),
                });
              }}
            >
              Add to Your Recipes
            </button>
          </div>
          <div className="diet-Ingredients">
          <img src={`${recipeDetails.image}`} alt="" />
            <div className="RecipeIngredients">
              <h3>Ingredients lists:</h3>
              <ul>
                {
                  // we store all the ingredients in an array(ingred)
                  // we map the list and we create a html list
                  recipeDetails?.extendedIngredients.map((ingredient: any, i:number) => {
                    ingred.push(ingredient.name)
                    return <li key={i}>{ingredient.name}</li>
                  })
                }
              </ul>
            </div>
            <div className="RecipeDiets">
              <h3>Diets:</h3>
              <ul>
                {recipeDetails.diets.map((diet: any, i: number) => {
                  dietS.push(diet);
                  return <li key={i}>{diet}</li>
                })}
              </ul>
            </div>
          </div>
          <div className="RecipeInstructions">
            <h3>Instructions:</h3>
            <p>{recipeDetails.instructions}</p>
          </div>
        </div>
      ) : (
        <div className="spin"></div>
      )}
    </>
  )
}

export default SingleRecipePage
