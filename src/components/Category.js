import { useContext,useEffect  } from 'react';
import { Context } from '../context/Context';
import { useNavigate} from "react-router-dom"
import axios from 'axios';
import { useState } from 'react/cjs/react.development';


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
    axios.get(`http://localhost:3001/category/${userId}/${catIdBackend}/recipes`)
    // axios.get(`https://my-recipes-backen.herokuapp.com/category/${userId}/${catIdBackend}/recipes`)
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
                console.log(recipe)
                return(
                    <div className="singleResult" key={i}>
                        <button className='removeRecipe' onClick={
                            ()=>{
                            axios.delete(`http://localhost:3001/category/${catIdBackend}/${recipe.id}`)
                            // axios.delete(`https://my-recipes-backen.herokuapp.com/category/${catIdBackend}/${recipe.id}`)
                            deleteRecipe(i)
                            setRecipesInCategory([...recipesInCategory])
                        }}>x</button>
                        <div className="resultPic" style={{backgroundImage:recipe.picture}}></div>
                        <p onClick={()=>{
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