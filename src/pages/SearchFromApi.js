import { useEffect, useState } from "react/cjs/react.development"
import { Link } from "react-router-dom"


import axios from "axios"
import NavigationBar from "../components/NavigationBar"
import SingleRecipe from "./SingleRecipePage"

import { useContext } from 'react';
import { Context } from '../context/Context';

const SearchFromApi =()=>{

    const [results, setResults] = useState([])
    const [criteria, setCriteria] = useState('')
    const [input,setInput] = useState('')
    const [specific,setSpecific] = useState(false)
    const [SingleRecipePage, setSingleRecipePage]= useState(false)

    const { recipeIdState } = useContext(Context);
    const [recipeId,setRecipeId] = recipeIdState

    const { recipeImageState } = useContext(Context);    
    const [recipeImage, setRecipeImage] = recipeImageState
   

    const [recipNm, setRecipNm]= useState('')
    const [diet, setDiet]= useState('')
    const [excludeIngredients, setExcludeIngredients]= useState('')
    const [intolerances, setIntolerances]= useState('')


    let arr=[]
   
    // ___________GET RECIPE FROM NAME____________________________
    const get_recipe_from_name=()=>{
        let recipeName=input
      
        const options = {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
            params: {query: recipeName},
            headers: {
                'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
                'x-rapidapi-key': '726fa2a7c2mshe40ce585ef7e075p1df5c9jsn1aac5454b25e'
            }
        };
        
        axios.request(options).then(function (response) {
            setResults(response.data.results)
            
        }).catch(function (error) {
            console.error(error,'recipe not found');
        });
    }
    // _______________________________________________________________

    //_______ function to get a recipe from ingredients:_____________
    const get_recipe_from_ingredients =  ()=>{
      
        let ingredientsFromBody=input
    
        const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
        params: {
            ingredients: ingredientsFromBody,
            number: '12',
            ignorePantry: 'true',
            ranking: '1'
        },
        headers: {
            'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
            'x-rapidapi-key': '726fa2a7c2mshe40ce585ef7e075p1df5c9jsn1aac5454b25e'
        }
        };
        
        axios.request(options).then(function (response) {
        setResults(response.data)
        arr.push(results)
        }).catch(function (error) {
        console.error(error);
        });
    }
    // _______________________________________________________________

       
    const specificSearch=(e)=>{

      

        e.preventDefault()
    const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
        params: {
            query: recipNm,
            diet: diet,
            excludeIngredients: excludeIngredients,
            intolerances: intolerances,
            number: '8',
            offset: '0',
            type: 'main course'

    
        },
        headers: {
            'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
            'x-rapidapi-key': '726fa2a7c2mshe40ce585ef7e075p1df5c9jsn1aac5454b25e'
        }
        };

        axios.request(options).then(function (response) {
            setResults(response.data.results);
           
           
        }).catch(function (error) {
            console.error(error);
        });
    }


    const search =(e)=>{
        e.preventDefault()
        arr.push(results)
        if (criteria ==='byName'){
            get_recipe_from_name()
        }else if (criteria ==='byIngredients'){
            get_recipe_from_ingredients()
        }
            
    }

    // const setSingleRecipe=()=>{
    //     setSingleRecipePage(true)
    //     setRecipeId(recipe.id)
    // }
        
        
        // useEffect(get_recipe_from_name,[])
        return(
        <>
        <NavigationBar/> 
        <h1>search here</h1>
        
        <div className="SearchSection">
            <div className='SearchForm'>
                <div className="beSpecific">
                    <p>Looking for a more specific diet, click here</p>
                    <button className="beSpecificButton" onClick={()=>{
                        if (specific===false){
                        setSpecific(true)}else{setSpecific(false)}
                        }}>+</button>
                </div>
                {!specific?
                    <form onSubmit={search}>
                        <label className="searchLabel" htmlFor="name"></label>
                        <select className="searchSelection" onChange={(e)=>{setCriteria(e.target.value)}}>
                            <option>select the search criteria</option>
                            <option value={'byName'}>by Name</option>
                            <option value={'byIngredients'}>by Ingredients</option>
                        </select>
                        <input className="searchInput" value={input} onChange={(e) => setInput(e.target.value)} />
                    </form>:
                    <>
                    <p>lets be more specific</p>
                        <form className="searchAuthForm" onSubmit={specificSearch}>
                            <div className="searchSubAuthForm">   
                                <div className='searchformInput'>
                                    <label htmlFor="name" id='userName'>Recipe Name:</label>
                                    <input value={recipNm} onChange={(e) => setRecipNm(e.target.value)} />
                                </div>
                                <div className='searchformInput'>
                                    <label >Diet:</label>
                                    <input value={diet} onChange={(e) => setDiet(e.target.value)} />
                                </div>
                                <div className='searchformInput'>
                                    <label >Exclude Ingredients:</label>
                                    <input value={excludeIngredients} onChange={(e) => setExcludeIngredients(e.target.value)} />
                                </div>
                                <div className='searchformInput'>
                                    <label >Intolerances:</label>
                                    <input value={intolerances} onChange={(e) => setIntolerances(e.target.value)} />
                                </div>
                                <div className='searchformInputSubmit'>
                                    <input className='formButton' type="submit" value="Submit" />
                                </div>
                            </div>
                    </form>
                </>
                }
               
            </div>
                <div className="resultsSection">
                    {SingleRecipePage==false?

                        results.map((recipe,i)=>{
                                
                                let split=recipe.image.split(":")
                                let split2=recipe.image.split("-")
                                console.log(recipe.image)
                                       
                                return(
                                recipe.image && split[0]=='https'?
                                
                                <div className="singleResult" key={i}>
                                    <div className="resultPic" style={{backgroundImage:`url(${recipe.image})`}}></div>
                                    <p onClick={()=>{setSingleRecipePage(true)
                                                    setRecipeId(recipe.id)
                                                    setRecipeImage(`url(${recipe.image})`)
                                                    }}>{recipe.title}</p>
                                </div>
                                    :
                                <div className="singleResult" key={i}>
                                    <div className="resultPic" style={{backgroundImage:`url(https://spoonacular.com/recipeImages/${recipe.image})`}}></div>
                                    <p onClick={()=>{setSingleRecipePage(true)
                                                    setRecipeId(recipe.id)
                                                    setRecipeImage(`url(https://spoonacular.com/recipeImages/${recipe.image})`)
                                                    }}>{recipe.title}</p>
                                </div>
                                )
                        })    
                    :
                    <>
                    <SingleRecipe recipeId={recipeId} setSingleRecipePage={setSingleRecipePage}/>
                    </>}
                </div>
        </div>
    </>
    )
}

export default SearchFromApi


// recipe.image?
                                
//         return(
//         g
//         // let split=recipe.image.split(":")
//         let split2=recipe.image.split("-")
//             <>
//             {
//             // console.log('split',split),
//             console.log('split2',split2.length),
//             console.log('results',results)}
//                 {
//                 // split!=undefined?
//                     // results?
//                 <div className="singleResult" key={i}>
//                     <>
//                         { 
//                         // split[0]=='https'||
//                         split2.length>2 ?
//                         <div className="resultPic" style={{
                            //     backgroundImage:`url(${recipe.image})`
                            // }}></div>:
//                         <div className="resultPic" style={{
                            // backgroundImage:`url(https://spoonacular.com/recipeImages/${recipe.image})`}}></div>
                        
//                         }
//                     </>
                    // <p onClick={()=>{
                        
                //     setSingleRecipePage(true)
                // }}>{recipe.title}</p>
//                 </div>
                
//             }</>
//         )
//     }
//         </>
//         :
//         <p>loading</p>
//     }):
// <p>loading</p>
// }