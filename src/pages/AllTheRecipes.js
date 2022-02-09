import axios from "axios"
import { useEffect,useState } from "react"
import NavigationBar from "../components/NavigationBar"
import { useNavigate } from "react-router-dom";
import env from 'react-dotenv';


//using context to pass the user informations between components
import { useContext } from 'react';
import { Context } from '../context/Context';

import SingleRecipe from "../components/SingleRecipe";

const AllTheRecipes = ()=>{

    const { userState } = useContext(Context);
    const [user, setUser] = userState

    // const { recipeIdState } = useContext(Context);
    // const [recipeId,setRecipeId] = recipeIdState
    
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
       
        axios.get(`${env.BACKEND_URL}/recipe/all/${userId}`)
        .then((response)=>{
            setAllRecipes(response.data)
        })
    },[])
    
    
    let list =[]


// fetching all the recipes already in a specific category

    useEffect(()=>{
        
            if (categId){
            
                axios.get(`${env.BACKEND_URL}/category/${userId}/${categId}/recipes`)
                .then((response)=>{
                    setAllRecipesInCat(response.data)
                    
                })
            }
    },[categId])

// after fetching the recipe we get all the id for those recipes and we "push" them in [list]
    
    allRecipesInCat.map(element => {
    console.log(element.id)
        list.push(element.id)
    })
    // console.log(categId)
    // console.log(allRecipes)
    // console.log(list)

    // at this point we filter the recipes in list from all the recipes that a user already has saved
    const filteredRecipeList = allRecipes.filter(({ id }) => !list.includes(id));
    console.log(filteredRecipeList)
    console.log(allRecipes)


    const deleteRecipe= (i)=>{
        
        allRecipes.splice(i,1)
        let array = allRecipesInCat
        setAllRecipes(array)
        filteredRecipeList.splice(i,1)

    }
    
    return(
        <>
            <NavigationBar/>
            <div className="allRecipesPageBanner"></div>
            <div className="allTheRecipes">
                {/* if the call to the backend is completed so we have all the recipes then.. */}
                {filteredRecipeList|| allRecipes?
                    <div className="allTheRecipeSection">
                        {categId  ?
                            <>
                                {/* TO FIX THIS ONE!!! */}
                                <button className="backsRecipes" onClick={()=>{
                                    history(-1)
                                    setCategId()
                                    setCategoryName()
                                }}>〈 </button>
                                {/* _________________ */}
                                {
                                filteredRecipeList.map((recipe,i)=>{
                                    
                                    return(
                                        <div className="recipe">
                                        <button className="deleteRecipe" onClick={()=>{
                                            axios.delete(`${env.BACKEND_URL}/recipe/${recipe.id}`)
                                            deleteRecipe(i)
                                            setAllRecipes([...allRecipes])
                                        }}>X</button>
                                        <SingleRecipe key={i} recipe={recipe}/>
                                        </div>
                                    ) 
                                })}
                            </> 
                            :
                            <>
                                <button className="backsRecipes" onClick={()=>{
                                    history('/user-page')
                                    setCategId()
                                    setCategoryName()
                                }}>〈 </button>
                                {
                                    allRecipes.map((recipe,i)=>{

                                        return(
                                            <div className="recipe">
                                            <button className="deleteRecipe" onClick={()=>{
                                        
                                                axios.delete(`${env.BACKEND_URL}/recipe/${recipe.id}`)
                                                deleteRecipe(i)
                                                setAllRecipes([...allRecipes])
                                            }}>X</button>
                                            <SingleRecipe key={i} recipe={recipe}/>
                                            </div>
                                        ) 
                                    })
                                }
                            </>                                 
                        }
                    </div>
                 :
                <div className='spin'></div> 
             } 
            </div>
        </>
    )
}

export default AllTheRecipes