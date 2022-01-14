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
    
    const { categIdState } = useContext(Context);
    const [categId,setCategId] = categIdState

    const { categoryNameState } = useContext(Context);
    const [categoryName,setCategoryName] = categoryNameState

    const [allRecipes, setAllRecipes] = useState([])
    const [allRecipesInCat, setAllRecipesInCat] = useState([])
    

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
    
    let list =[]
    if (categId){
            axios.get(`http://localhost:3001/category/${userId}/${categId}/recipes`)
            // axios.get(`https://my-recipes-backen.herokuapp.com/recipe/all/${userId}`)
            .then((response)=>{
                setAllRecipesInCat(response.data)
                
            })
            console.log(allRecipesInCat)
            allRecipesInCat.map(element => {
                
                console.log(element.id)
                list.push(element.id)
            })
        }
            
console.log(list)

const deleteRecipe= (i)=>{

    allRecipes.splice(i,1)
    let array = allRecipesInCat
    setAllRecipes(array)
  }

    return(
        <>
            <NavigationBar/>
            <div className="allRecipesPageBanner"></div>
            {categId?
                <div className="allTheRecipes">
                    { allRecipes  ?
                    <>
                    <p className="links" onClick={()=>{
                        history(-1)
                        setCategId()
                        setCategoryName()
                    }}> --- Back</p>
                        <div className="allTheRecipeSection">
                            {
                                allRecipes?.map((recipe,i)=>{
                                    
                                    return(
                                        <>
                                        { !list.includes(recipe.id)?
                                        <>
                                        <button className="deleteRecipe" onClick={()=>{
                                            axios.delete(`http://localhost:3001/recipe/${recipeId}`)
                                            // axios.delete(`https://my-recipes-backen.herokuapp.com/recipe/${recipeId}`)
                                            deleteRecipe(i)
                                            setAllRecipes([...allRecipes])
                                        }}>X</button>
                                        <SingleRecipe key={i} recipe={recipe}/>
                                        </>
                                        :
                                        null
                                        }
                                        </>
                                    ) 
                                })                    
                            }
                        </div>
                    </>
                    :
                    <div className='spin'></div> 
                
                    }                      
                </div>
                :
                <div className="allTheRecipes">
                    { allRecipes  ?
                    <>
                        <h3 className="linksRecipes" onClick={()=>{
                            history('/user-page')
                            setCategId()
                            setCategoryName()
                        }}>Back to My Categories</h3>
                        <div className="allTheRecipeSection">
                            {
                                allRecipes?.map((recipe,i)=>{

                                    return(
                                        <div className="recipe">
                                        <button className="deleteRecipe" onClick={()=>{
                                            axios.delete(`http://localhost:3001/recipe/${recipeId}`)
                                            // axios.delete(`https://my-recipes-backen.herokuapp.com/recipe/${recipeId}`)
                                            deleteRecipe(i)
                                            setAllRecipes([...allRecipes])
                                        }}>X</button>
                                        <SingleRecipe key={i} recipe={recipe}/>
                                        </div>
                                    ) 
                                })                    
                            }
                        </div>
                    </>
                    :
                    <div className='spin'></div> 
                    }
                
                 </div>
            }
        </>
    )
}

export default AllTheRecipes