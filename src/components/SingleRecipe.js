import axios from "axios"
import { useState,useContext,useEffect} from "react"
import { useNavigate } from "react-router-dom";

//using context to pass the user informations between components
import { Context } from '../context/Context';

import env from 'react-dotenv';

const SingleRecipe =(props)=>{

    const { recipeIdState } = useContext(Context);
    const [recipeId,setRecipeId] = recipeIdState

    const { categIdState } = useContext(Context);
    const [categId,setCategId] = categIdState

    const { categoryNameState } = useContext(Context);
    const [categoryName,setCategoryName] = categoryNameState

    const [animations, setAnimations] = useState()
    const [borders, setBorders] = useState()
    const [buttonFunction, setButtonFunction] = useState(true)

    // const [allRecipes, setAllRecipes] = useState([])


    let history = useNavigate()
    // let userId = localStorage.getItem('userId')
    // console.log(props.recipe.picture)
    return(
       
            <div className="singleResult" >
                
                <img className="resultPic" src={props.recipe.picture?.split('(')[1].split(')',1)} style={{
                    // backgroundImage:props.recipe.picture,
                    animation:animations,
                    border:borders
                    }}/>
                <div className="resultPicSection">
                <p className="linksRecipe" onClick={()=>{
                    history('/saved-recipe')
                    setRecipeId(props.recipe.id)
                    }}>{props.recipe.name}</p> 
            
                {categoryName?
                        <>
                        {buttonFunction===true ?
                            <button onClick={
                                ()=>{
                               
                                axios.put(`${env.BACKEND_URL}/category/${categId}/${props.recipe.id}`)
                                setAnimations('rotation .4s')
                                setBorders("4px solid red")
                                if(buttonFunction===true){setButtonFunction(false)}else{setButtonFunction(true)}
                            }}> add to {categoryName}</button>
                            :
                            <button onClick={
                                ()=>{
                                    setButtonFunction(true)
                        
                                    axios.delete(`${env.BACKEND_URL}/category/${categId}/${props.recipe.id}`)
                                    setAnimations('rotationInv .4s')
                                    setBorders("1px solid black")
                                }}>Remove</button>
                            }
                        </>:
                        null}
                </div>
               
                
            </div>
    )
}

export default SingleRecipe