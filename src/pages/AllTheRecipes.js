import axios from "axios"
import { useEffect,useState } from "react"
import NavigationBar from "../components/NavigationBar"
import { useNavigate } from "react-router-dom";


//using context to pass the user informations between components
import { useContext } from 'react';
import { Context } from '../context/Context';

import SingleRecipe from "../components/SingleRecipe";

const AllTheRecipes = ()=>{

    const { userState } = useContext(Context);
    const [user, setUser] = userState

    const { recipeIdState } = useContext(Context);
    const [recipeId,setRecipeId] = recipeIdState
    
    const { categoryIdState } = useContext(Context);
    const [categoryId,setCategoryId] = categoryIdState

    const { categoryNameState } = useContext(Context);
    const [categoryName,setCategoryName] = categoryNameState

    const [allRecipes, setAllRecipes] = useState([])
    

    let userId = localStorage.getItem('userId')
    let history = useNavigate()

    console.log(user)
    useEffect(()=>{
        axios.get(`http://localhost:3001/recipe/all/${userId}`)
        // axios.get(`https://my-recipes-backen.herokuapp.com/recipe/all/${userId}`)
        .then((response)=>{
            setAllRecipes(response.data)
        })
    },[])

 

    return(
        <>
            <NavigationBar/>
            {allRecipes?
                <div className="allTheRecipes">
                    <p onClick={()=>{
                        history(-1)
                        setCategoryId()
                        setCategoryName()
                    }}> --- Back</p>
                        <div className="allTheRecipeSection">
                            {
                               
                                
                                allRecipes.map((recipe,i)=>{
            
                                    return(

                                        <SingleRecipe key={i} recipe={recipe}/>
                                    ) 
                                    
                                })                       
                            }
                        </div>
                </div>
                :
                <div className='spin'></div>
            }
        </>
    )
}

export default AllTheRecipes