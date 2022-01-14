import axios from "axios"
import { useState,useContext,useEffect} from "react"
import { useNavigate } from "react-router-dom";

//using context to pass the user informations between components
import { Context } from '../context/Context';

const SingleRecipe =(props)=>{

    const { recipeIdState } = useContext(Context);
    const [recipeId,setRecipeId] = recipeIdState

    const { categoryIdState } = useContext(Context);
    const [categoryId,setCategoryId] = categoryIdState

    const { categoryNameState } = useContext(Context);
    const [categoryName,setCategoryName] = categoryNameState

    const [animation, setAnimation] = useState()
    const [recipesCategory, setRecipeCategory] = useState()
    const [buttonFunction, setButtonFunction] = useState(true)

    let history = useNavigate()
    let userId = localStorage.getItem('userId')
    // console.log(categoryName)
    //     useEffect(()=>{
    //     if (categoryId){
    //         axios.get(`http://localhost:3001/category/${userId}/${categoryId}/recipes`)
    //         .then((response)=>{
    //             console.log(response)
    //             setRecipeCategory(response.data)
    //         })
    //     }
    // })

    return(
        <div className="singleResult" >
        <div className="resultPic" style={{
            backgroundImage:props.recipe.picture,
            transform:animation
            }}></div>
        <p onClick={()=>{
            history('/saved-recipe')
            setRecipeId(props.recipe.id)
            }}>{props.recipe.name}</p> 
            {categoryName?
                <>

                {buttonFunction===true?
                    <button onClick={
                        ()=>{
                        axios.put(`http://localhost:3001/category/${categoryId}/${props.recipe.id}`)
                        // axios.put(`https://my-recipes-backen.herokuapp.com/category/${categoryId}/${recipe.id}`)
                        setAnimation('rotate(45deg)')
                        setButtonFunction(false)
                    }}> add to {categoryName}</button>:
                    <button onClick={
                        ()=>{
                            setButtonFunction(true)
                            axios.delete(`http://localhost:3001/category/${categoryId}/${props.recipe.id}`)
                            // axios.delete(`https://my-recipes-backen.herokuapp.com/category/${catIdBackend}/${recipe.id}`)
                        }}>Remove</button>
                    }
                </>:
                null}
    </div>  
    )
}

export default SingleRecipe