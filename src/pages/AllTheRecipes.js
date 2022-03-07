import axios from "axios"
import { useEffect,useState } from "react"
import NavigationBar from "../components/NavigationBar"
import { useNavigate } from "react-router-dom";
import env from 'react-dotenv';

import img from "../img/colorBanner.jpeg"

//using context to pass the user informations between components
import { useContext } from 'react';
import { Context } from '../context/Context';

import SingleRecipe from "../components/SingleRecipe";

const AllTheRecipes = ()=>{

    const { userState } = useContext(Context);
    const [user, setUser] = userState
    
    const { categIdState } = useContext(Context);
    const [categId,setCategId] = categIdState

    const { categoryNameState } = useContext(Context);
    const [categoryName,setCategoryName] = categoryNameState

    
    const [allRecipes, setAllRecipes] = useState([])
    const [allRecipesInCat, setAllRecipesInCat] = useState([])
    

    let userId = localStorage.getItem('userId')
    let history = useNavigate()

    // setting the all recipes state, fetching all the recipes for a that user in the database
    useEffect(()=>{
       
        axios.get(`${env.BACKEND_URL}/recipe/all/${userId}`)
        .then((response)=>{
            setAllRecipes(response.data)
        })
    },[])
    

// setting an empty array that we need for filtering the recipes already in a category
    let list =[]
// fetching all the recipes already in a specific category and we store them in setAllRecipesInCat state
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
    // console.log(element.id)
        list.push(element.id)
    })

    // at this point we filter the recipes in list from all the recipes that a user already has saved
    const filteredRecipeList = allRecipes.filter(({ id }) => !list.includes(id));

    const deleteRecipe= (i)=>{
        allRecipes.splice(i,1)
        setAllRecipes([...allRecipes])
    }

    const deletefilteredRecipe=(i)=>{
        filteredRecipeList.splice(i,1)
        setAllRecipes([...filteredRecipeList])
    }
    
    return(
        <>
            <NavigationBar/>
            <img className="allRecipesPageBanner" src={img}/>
            <div className="allTheRecipes">
                {/* if the call to the backend is completed so we have all the recipes then.. */}
                {filteredRecipeList|| allRecipes?
                    <div className="allTheRecipeSection">
                        {/* if there's a catId, that means we're coming from the categories page so we're trying to add a recipe to a cat */}
                        {categId  ?
                            <>
                                <button className="backsRecipes" onClick={()=>{
                                    // reset the cat name and id
                                    history(-1)
                                    setCategId()
                                    setCategoryName()
                                }}>〈 </button>
                                {
                                // instead of showing all the user's recipe we want to show the one not already in cat
                                filteredRecipeList.map((recipe,i)=>{
                                    
                                    return(
                                        <div key={i} className="recipe">
                                        <button className="deleteRecipe" onClick={()=>{
                                            axios.delete(`${env.BACKEND_URL}/recipe/${recipe.id}`)
                                            deletefilteredRecipe(i)
                                            
                                        }}>X</button>
                                        <SingleRecipe recipe={recipe}/>
                                        </div>
                                    ) 
                                })}
                            </> 
                            :
                            <>
                            {/* if there's not catId we want to see all the user's recipes  */}
                                <button className="backsRecipes" onClick={()=>{
                                    history('/user-page')
                                }}>〈 </button>
                                {
                                    allRecipes.map((recipe,i)=>{

                                        return(
                                            <div key={i} className="recipe">
                                            <button className="deleteRecipe" onClick={()=>{
                                                axios.delete(`${env.BACKEND_URL}/recipe/${recipe.id}`)
                                                deleteRecipe(i)
                                            }}>X</button>
                                            <SingleRecipe  recipe={recipe}/>
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