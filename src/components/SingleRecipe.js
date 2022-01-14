import axios from "axios"
import { useState,useContext,useEffect} from "react"
import { useNavigate } from "react-router-dom";

//using context to pass the user informations between components
import { Context } from '../context/Context';

const SingleRecipe =(props)=>{

    const { recipeIdState } = useContext(Context);
    const [recipeId,setRecipeId] = recipeIdState

    const { categIdState } = useContext(Context);
    const [categId,setCategId] = categIdState

    const { categoryNameState } = useContext(Context);
    const [categoryName,setCategoryName] = categoryNameState

    const [animations, setAnimations] = useState('')
    const [recipesCategory, setRecipeCategory] = useState()
    const [buttonFunction, setButtonFunction] = useState(true)
    const [allRecipesInCat, setAllRecipesInCat] = useState([])

    let history = useNavigate()
    let userId = localStorage.getItem('userId')
    // console.log(categoryName)
    useEffect(()=>{
                axios.get(`http://localhost:3001/category/${userId}/${categId}/recipes`)
                // axios.get(`https://my-recipes-backen.herokuapp.com/recipe/all/${userId}`)
                .then((response)=>{
                    setAllRecipesInCat(response.data)
                })
            },[])
            console.log(allRecipesInCat)
            let list =[]
            allRecipesInCat?.map(element => {
           
                console.log(element.id)
                list.push(element.id)
            })

            console.log(list)

    return(
       
        // { list.includes(props.recipe.id)?
            <div className="singleResult" >
                <div className="resultPic" style={{
                    backgroundImage:props.recipe.picture,
                    animation:animations
                    }}></div>
                <p onClick={()=>{
                    history('/saved-recipe')
                    setRecipeId(props.recipe.id)
                    }}>{props.recipe.name}</p> 
            

                {buttonFunction===true?
                    <button onClick={
                        ()=>{
                        axios.put(`http://localhost:3001/category/${categId}/${props.recipe.id}`)
                        // axios.put(`https://my-recipes-backen.herokuapp.com/category/${categoryId}/${recipe.id}`)
                        setAnimations('rotation 5s')
                        if(buttonFunction===true){setButtonFunction(false)}else{setButtonFunction(true)}
                    }}> add to {categoryName}</button>
                    :
                    <button onClick={
                        ()=>{
                            setButtonFunction(true)
                            axios.delete(`http://localhost:3001/category/${categId}/${props.recipe.id}`)
                            // axios.delete(`https://my-recipes-backen.herokuapp.com/category/${catIdBackend}/${recipe.id}`)
                        }}>Remove</button>
                    }
               
                
            </div>
    //         :
    //         <div>
    //         <div className="singleResult" >
    //         <div className="resultPic" style={{
    //             backgroundImage:props.recipe.picture,
    //             }}></div>
    //         <p onClick={()=>{
    //             history('/saved-recipe')
    //             setRecipeId(props.recipe.id)
    //             }}>{props.recipe.name}</p> 
                
    //         </div>
    //     </div>  
    // }
    // </>
    )
}

export default SingleRecipe