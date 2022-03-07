import { useContext,useEffect  } from 'react';
import { Context } from '../context/Context';
import { useNavigate} from "react-router-dom"
import axios from 'axios';
import { useState } from 'react/cjs/react.development';

import env from 'react-dotenv';

const Category= (props)=>{

    let history = useNavigate()
    // we use setRecipeId context to temporary store the id so SinglePageFromBackend can use it 
    const { recipeIdState } = useContext(Context);
    const [recipeId,setRecipeId] = recipeIdState

    // we set CategId and categoryName context to use the filter function in all recipes page

    const { categIdState } = useContext(Context);
    const [categId,setCategId] = categIdState

    const { categoryNameState } = useContext(Context);
    const [categoryName,setCategoryName] = categoryNameState

    const [recipesInCategory, setRecipesInCategory] = useState([])

    
    // props we need for the backend call 
    let catIdBackend= props.category.id
    let userId = localStorage.getItem('userId')
    // backend call function to get all the recipes in a specific category
    const getRecipeCategory=()=>{
    axios.get(`${env.BACKEND_URL}/category/${userId}/${catIdBackend}/recipes`)
    .then((response)=>{
        // console.log(response.data)
        // we store them in a recipesInCategory state
        setRecipesInCategory(response.data)
    })}

    useEffect(getRecipeCategory,[])
    

    // function to delete the recipes in a category 
    const deleteRecipe= (i)=>{
        recipesInCategory.splice(i,1)
        // and update the list
        setRecipesInCategory([...recipesInCategory])
    }
    

    return(
        <>
        <p className='categoryTitle'>{props.category.name}</p>
        <div className="singleCat">
                {/* we map through the list of the recipes in our category */}
            {recipesInCategory.map((recipe,i)=>{

                return(
                    // and we show every single recipe with a remove button that removes it from the category 
                    <div className="singleResult" key={i}>
                        <button className='removeRecipe' onClick={()=>{
                            axios.delete(`${env.BACKEND_URL}/category/${catIdBackend}/${recipe.id}`)
                            deleteRecipe(i)
                        }}>x</button>
                        <div className="resultPic" style={{backgroundImage:recipe.picture}}></div>
                        {/* if we click to the recipe title we'll open the recipe page in saved-recipe  */}
                        <p className='linksRecipe' onClick={()=>{
                            // we use setRecipeId context to temporary store the id so SinglePageFromBackend can use it 
                            setRecipeId(recipe.id)
                            // we need to navigate to /saved-recipe route in order to open the singleRecipePage component
                            history('/saved-recipe')
                            }}>{recipe.name}</p> 
                    
                    </div>
                )
            })}
        </div>
        <button className='addRecipeButton' onClick={()=>{
            // we set CategId and categoryName context to use the filter function in all recipes page
            setCategId(props.category.id)
            history('/all-the-recipes')
            setCategoryName(props.category.name)
            }
            }>Add Recipe</button>
    </>
    )
}

export default Category