
import React,  { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";

import axios from "axios";
import env from "react-dotenv";
import { api_service } from "../../spoonacular/api_service";

const SingleRecipePage =  () => {
  let history = useNavigate()

  const context = useContext(Context)
  if (!context) throw new Error('useContext must be used within a Provider')

  const { recipeIdState, recipeImageState, recipeDetailsState, tabSwitchState } = context
  const [recipeId, setRecipeId] = recipeIdState
  const [recipeDetails, setRecipeDetails] = recipeDetailsState
  

  const userId = localStorage.getItem("userId")

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const details = await api_service.all_the_info(Number(recipeId))
        setRecipeDetails(details)
      } catch (error) {
        console.error("Failed to fetch recipe details:", error)
      }
    }
    fetchRecipeDetails()
  }, [recipeId])

  const saveRecipe = () => {
    axios.post(`${env.BACKEND_URL}/recipe/${userId} `, {
      apiId: recipeDetails.id,
      ingredients: ingred.toString(),
      instructions: recipeDetails.summary,
      picture: recipeDetails.image,
      name: recipeDetails.title,
      diets: dietS.toString(),
    })
  }

  console.log(recipeDetails)

  let dietS: string[] = []
  let ingred: string[] = []

  return (
    <>
      {/* check that all the info are loaded if not we load the loading page */}
      {
        recipeDetails &&
        recipeDetails.title &&
        recipeDetails.image ? (
        <div className="SingleRecipe">
          <h3 className="recipeTitle">{recipeDetails.title}</h3>
          <div className="singleRecipeButtons">
            <button
              onClick={() => {
                history(`/user-page`)
                setRecipeDetails({})
              }}
            >
              Back to Search
            </button>
            <button
              onClick={saveRecipe}
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
                  recipeDetails.extendedIngredients?.map((ingredient: any, i:number) => {
                    ingred.push(ingredient.name)
                    return <li key={i}>{ingredient.name}</li>
                  }) || <li>No ingredients available</li>
                }
              </ul>
            </div>

            <div className="RecipeDiets">
              <h3>Diets:</h3>
              <ul>
                {recipeDetails.diets?.map((diet: any, i: number) => {
                  dietS.push(diet);
                  return <li key={i}>{diet}</li>
                }) || <li>No diets available</li>
                
                }
              </ul>
            </div>

          </div>

          <div className="RecipeInstructions">

            <h3>Instructions:</h3>
            {recipeDetails.instructions ?
              <p dangerouslySetInnerHTML={{__html: recipeDetails.instructions }}></p>
              :
              <p dangerouslySetInnerHTML={{__html: recipeDetails.summary }}></p>
            }
          </div>
          
        </div>
      ) : (
        <div className="spin"></div>
      )}
    </>
  )
}

export default SingleRecipePage
