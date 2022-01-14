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

    return(
        <>
            <NavigationBar/>
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
                            //    allRecipes  ?
                                
                                allRecipes?.map((recipe,i)=>{
                                    
                                    return(
                                        <>
                                       { !list.includes(recipe.id)?
                                       
                                        <SingleRecipe key={i} recipe={recipe}/>
                                  
                                        :
                                        null
                                       }
                                       </>
                                    ) 
                                    
                                }) 
                                // :
                                // <div className='spin'></div>                       
                            }
                        </div>
                </>
                :
                <div className='spin'></div> 
                
                }                      
                </div>
                :
                <>
                {
                    allRecipes  ?
                     
                     allRecipes?.map((recipe,i)=>{
                         
                         return(
                             
                             <SingleRecipe key={i} recipe={recipe}/>
                         ) 
                         
                     }) 
                     :
                     <div className='spin'></div>                       
                 }
                 </>
            }
        </>
    )
}

export default AllTheRecipes