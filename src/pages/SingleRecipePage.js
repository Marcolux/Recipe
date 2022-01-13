import axios from "axios"

import { useContext, useEffect } from 'react';
import { useState } from "react/cjs/react.development";
import { Context } from '../context/Context';

const SingleRecipe=()=>{

    const { recipeIdState } = useContext(Context);
    const [recipeId,setRecipeId] = recipeIdState

    const { recipeImageState } = useContext(Context);    
    const [recipeImage, setRecipeImage] = recipeImageState

    const { SingleRecipePageState } = useContext(Context);
    const [SingleRecipePage, setSingleRecipePage] = SingleRecipePageState
    
    const { recipeDetailsState } = useContext(Context);
    const [ recipeDetails,setRecipeDetails] = recipeDetailsState
    

    const userId = localStorage.getItem('userId')

    const all_the_info =()=>{
        const options = {
          method: 'GET',
          url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`,
          headers: {
            'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
            'x-rapidapi-key': '726fa2a7c2mshe40ce585ef7e075p1df5c9jsn1aac5454b25e'
          }
        };
        
        axios.request(options).then(function (response) {
            console.log(response.data)
            setRecipeDetails(response.data)
        }).catch(function (error) {
            console.error(error);
        });
        }

    useEffect(all_the_info,[recipeId])

    let dietS=[]
    let ingred=[]


    return(
        <>
            {
                recipeDetails?
                    <div className="SingleRecipe">
                            {recipeImage && recipeDetails.diets && recipeDetails.extendedIngredients?
                            <div className="SingleRecipe">
                                <h3 className="recipeTitle">{recipeDetails.title}</h3>
                                <div className="singleRecipeButtons">
                                <button onClick={()=>{setSingleRecipePage(false)}}>Back to Search</button>
                                    <button onClick={()=>{
                                        axios.post(`http://localhost:3001/recipe/${userId} `,
                                        // axios.post(`https://my-recipes-backen.herokuapp.com/recipe/${userId} `,
                                        {
                                        apiId:recipeDetails.id,
                                        ingredients:ingred.toString(),
                                        instructions:recipeDetails.instructions,
                                        picture:recipeImage,name:recipeDetails.title,
                                        diets:dietS.toString()
                                        })
                                        }}>Add to Your Recipes</button>
                                </div>
                                <div className="diet-Ingredients">
                                <div className="SingleRecipePic" style={{backgroundImage:recipeImage}}></div>
                                    <div className="RecipeIngredients">
                                    <h3>Ingedients lists:</h3>
                                    <ul >
                                        {
                                            recipeDetails.extendedIngredients.map((ingredient,i)=>{
                                                ingred.push(ingredient.name)
                                                return(<li key={i}>{ingredient.name}</li>)
                                            })
                                        }
                                    </ul>
                                    </div>
                                    <div className="RecipeDiets">
                                        <h3>Diets:</h3>
                                        <ul>
                                        {
                                            recipeDetails.diets.map((diet,i)=>{
                                                dietS.push(diet)
                                                return(
                                                    <li key={i}>{diet}</li>)
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className="RecipeInstructions">
                                <h3>Instructions:</h3>    
                                    <p>{recipeDetails.instructions}</p>
                                </div>
                                
                            </div>
                            :
                            <div className='spin'></div>
                            }
                    </div>
                    :
                    <div className='spin'></div>
                }
        </>


    
    )
}

export default SingleRecipe