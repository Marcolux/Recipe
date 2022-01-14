import axios from "axios"
import { useEffect, useState} from "react/cjs/react.development"
import { useNavigate} from "react-router-dom"
// import { useHistory } from "react-router-dom";

//using context to pass the user informations between components
import { useContext } from 'react';
import { Context } from '../context/Context';

const SinglePageFromBackend=(props)=>{
    const { SingleRecipePageState } = useContext(Context);
    const [SingleRecipePage, setSingleRecipePage] = SingleRecipePageState

    const { recipeIdState } = useContext(Context);
    const [recipeId,setRecipeId] = recipeIdState


    const [singleRecipe,setSingleRecipe]= useState({})

    const userId = localStorage.getItem('userId')

    let ingred = []
    
    let history = useNavigate()
    
    
    const getInfo=()=>{
        // axios.get(`http://localhost:3001/recipe/${recipeId}`)
        axios.get(`https://my-recipes-backen.herokuapp.com/recipe/${recipeId}`)
        .then((response)=>{
            setSingleRecipe(response.data)
           
        })
    }    
    useEffect(getInfo,[])

    
    let newIngredients = singleRecipe.ingredients?.split(',')
    
    return(
        
        <div className="SingleRecipePage">
                {
                    singleRecipe ?
                    <div className="SingleRecipe">
                        <div className="singleRecipeButtons">
                                    <button onClick={()=>{
                                        setSingleRecipePage(false)
                                        history(-1)
                                        }}>Back </button>
                                            <button onClick={()=>{
                                                // axios.post(`http://localhost:3001/:categoryId/${recipeId}`)
                                                axios.post(`https://my-recipes-backen.herokuapp.com/:categoryId/${recipeId}`)
                                            
                                            }}>Add to My Recipe {}</button>
                            </div>   
                        <h3 className="recipeTitle">{singleRecipe.name}</h3>
                            <div className="diet-Ingredients">
                                <div className="SingleRecipePic" style={{backgroundImage:singleRecipe.picture}}></div>
                                    <div className="RecipeIngredients">
                                        <h3>Ingedients lists:</h3>
                                        <ul >
                                            {
                                                newIngredients?.map((ingredient,i)=>{
                                                    return(<li key={i}>{ingredient}</li>)
                                                })
                                            }
                                        </ul>
                                    </div>
                            <div className="RecipeDiets">
                                        <h3>Diets:</h3>
                                        <ul>
                                        {singleRecipe.diets===""?
                                                <p>No particular diets</p>
                                                :
                                                singleRecipe.diets?.split(',')?.map((diet,i)=>{
                                                    return(
                                                        <li key={i}>{diet}</li>)
                                                    })
                                                }
                                        </ul>
                            </div>
                            </div>
                                
                                <div className="RecipeInstructions">
                                    <h3>Instructions:</h3>    
                                        <p>{singleRecipe.instructions}</p>
                                </div>
                                    
                                  
                    
                    </div>
                    :    
                    <p>hi</p>
                }
            
            
        </div>
    )
}


export default SinglePageFromBackend
