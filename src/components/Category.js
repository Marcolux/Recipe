import { useContext,useEffect  } from 'react';
import { Context } from '../context/Context';
import { useNavigate} from "react-router-dom"
import axios from 'axios';
import { useState } from 'react/cjs/react.development';

import env from 'react-dotenv';

const Category= (props)=>{

    let history = useNavigate()

    const { categIdState } = useContext(Context);
    const [categId,setCategId] = categIdState
    

    const { recipeIdState } = useContext(Context);
    const [recipeId,setRecipeId] = recipeIdState

    const [recipesInCategory, setRecipesInCategory] = useState([])

    let catIdBackend= props.category

    let userId = localStorage.getItem('userId')

    const getRecipeCategory=()=>{
    axios.get(`${env.BACKEND_URL}/category/${userId}/${catIdBackend}/recipes`)
    .then((response)=>{
        // console.log(response.data)
        setRecipesInCategory(response.data)
    })}
    useEffect(getRecipeCategory,[])

    const deleteRecipe= (i)=>{

        recipesInCategory.splice(i,1)
        let array = recipesInCategory
        setRecipesInCategory(array)
      }

    return(
        <div className="singleCat">
            {recipesInCategory?.map((recipe,i)=>{

                return(
                    <div className="singleResult" key={i}>
                        <button className='removeRecipe' onClick={
                            ()=>{
                            
                            axios.delete(`${env.BACKEND_URL}/category/${catIdBackend}/${recipe.id}`)
                            deleteRecipe(i)
                            setRecipesInCategory([...recipesInCategory])
                        }}>x</button>
                        <div className="resultPic" style={{backgroundImage:recipe.picture}}></div>
                        <p className='linksRecipe' onClick={()=>{
                            setRecipeId(recipe.id)
                            history('/saved-recipe')
                            }}>{recipe.name}</p> 
                    
                    </div>
                )
            })}
        </div>
    )
}

export default Category