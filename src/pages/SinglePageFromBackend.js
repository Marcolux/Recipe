import axios from "axios"
import { useEffect, useState} from "react/cjs/react.development"
import { useNavigate} from "react-router-dom"
// import { useHistory } from "react-router-dom";
import reactDom from "react-dom";

//using context to pass the user informations between components
import { useContext } from 'react';
import { Context } from '../context/Context';

import env from 'react-dotenv';

const SinglePageFromBackend=(props)=>{

    const { SingleRecipePageState } = useContext(Context);
    const [SingleRecipePage, setSingleRecipePage] = SingleRecipePageState

    // context to fetch the info from the api
    const { recipeIdState } = useContext(Context);
    const [recipeId,setRecipeId] = recipeIdState

    // state to store all the recipe info from the backend 
    const [singleRecipe,setSingleRecipe]= useState({})

    // const userId = localStorage.getItem('userId')

    // let ingred = []
    
    let history = useNavigate()
    
    
    const getInfo=()=>{
        axios.get(`${env.BACKEND_URL}/recipe/${recipeId}`)
        .then((response)=>{
            setSingleRecipe(response.data)
           
        })
    }    
    useEffect(getInfo,[])

    // console.log(singleRecipe.ingredients)
    // creating an array from the ingredients string
    let newIngredients = singleRecipe.ingredients?.split(',')
    // console.log(newIngredients)
    
    return(
        
        <div className="SingleRecipePage">
                {
                    singleRecipe ?
                    <div className="SingleRecipe">
                            <div className="recipeHeader">
                            <button onClick={()=>{
                                setSingleRecipePage(false)
                                history(-1)
                                }}>〈 </button>
                                    {/* {console.log(singleRecipe.picture?.split('(')[1].split(')',1))} */}
                                            
                              
                            <h3 className="recipeTitle">{singleRecipe.name}</h3>
                            {/* <button onClick={()=>{}}>Modify</button> */}
                            </div>
                            <div className="diet-Ingredients">
                                {/* now a lazy way to use the https address as src for the img */}
                                <img className="SingleRecipePic" src={singleRecipe.picture?.split('(',2)[1].split(')',1)} alt="display image"/>
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
                            
                            </div>
                            <div className="RecipeInstructions">
                                <h3>Instructions:</h3>    
                                    <p>{singleRecipe.instructions}</p>
                            </div>
                            <div className="RecipeDiets">
                                        <h3>Diets:</h3>
                                        <ul>
                                        {singleRecipe.diets===''?
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
                    :    
                    <div className='spin'></div>
                }
            
            
        </div>
    )
}


export default SinglePageFromBackend
