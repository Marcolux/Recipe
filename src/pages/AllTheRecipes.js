import axios from "axios"
import { useEffect,useState } from "react/cjs/react.development"
import NavigationBar from "../components/NavigationBar"



//using context to pass the user informations between components
import { useContext } from 'react';
import { Context } from '../context/Context';
import SinglePageFromBackend from "./SinglePageFromBackend";

const AllTheRecipes = ()=>{

    const { userState } = useContext(Context);
    const [user, setUser] = userState

    const { recipeIdState } = useContext(Context);
    const [recipeId,setRecipeId] = recipeIdState

 
    const [SingleRecipePage, setSingleRecipePage] = useState(false)

    const { categoryIdState } = useContext(Context);
    const [categoryId,setCategoryId] = categoryIdState

    const [allRecipes, setAllRecipes] = useState([])

    let userId = localStorage.getItem('userId')


    console.log(user)
    useEffect(()=>{
        // axios.get(`http://localhost:3001/recipe/all/${userId}`)
        axios.get(`http://https://my-recipes-backen.herokuapp.com//recipe/all/${userId}`)
        .then((response)=>{
            console.log(response.data)
            setAllRecipes(response.data)
        })
    },[])
    



    return(
        <>
            <NavigationBar/>
            {allRecipes?
            <div className="allTheRecipes">
                <p>All My Recipes Here</p>
                <div className="allTheRecipeSection">
                    {
                        SingleRecipePage===false?
                        <>
                    {
                        allRecipes.map((recipe,i)=>{
                            console.log(recipe)
                            return(
                                    <div className="singleResult" key={i}>
                                    <div className="resultPic" style={{backgroundImage:recipe.picture}}></div>
                                    <p onClick={()=>{
                                        setSingleRecipePage(true)
                                        setRecipeId(recipe.id)
                                        }}>{recipe.name}</p> 
                                    <button onClick={
                                        ()=>{
                                        // axios.put(`http://localhost:3001/category/${categoryId}/${recipe.id}`)
                                        axios.put(`http://https://my-recipes-backen.herokuapp.com//category/${categoryId}/${recipe.id}`)
                                    }}> add to{categoryId}</button>
                                    </div>
                                ) 
                            
                        })                       
                    }
                    </>:
                    <SinglePageFromBackend/>
                    }

                        
                    
                
                    
                </div>
            </div>:
            <div className='spin'></div>}
        </>
    )
}

export default AllTheRecipes