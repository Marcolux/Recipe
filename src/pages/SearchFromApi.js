import { useEffect, useState } from "react/cjs/react.development"
import { Link } from "react-router-dom"
import axios from "axios"
import NavigationBar from "../components/NavigationBar"
import SingleRecipe from "./SingleRecipePage"

const SearchFromApi =()=>{

    const [results, setResults] = useState([])
    const [criteria, setCriteria] = useState('')
    const [input,setInput] = useState('')
    const [specific,setSpecific] = useState(false)
    const [SingleRecipePage, setSingleRecipePage]= useState(false)

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
            number: '24',
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
            console.log(response.data.results);
           
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
        
        
        // useEffect(get_recipe_from_name,[])
        return(
        <>
        <NavigationBar/> 
        <h1>search here</h1>
        <p>Looking for a more specific diet, click here</p>
        <button onClick={()=>{
            if (specific===false){
            setSpecific(true)}else{setSpecific(false)}
            }}>+</button>
        <div className="SearchSection">
            <div className='SearchForm'>
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
                        <form className="AuthForm" onSubmit={specificSearch}>
                            <div className="subAuthForm">   
                                <div className='formInput'>
                                    <label htmlFor="name" id='userName'>Recipe Name:</label>
                                    <input value={recipNm} onChange={(e) => setRecipNm(e.target.value)} />
                                </div>
                                <div className='formInput'>
                                    <label >Diet:</label>
                                    <input value={diet} onChange={(e) => setDiet(e.target.value)} />
                                </div>
                                <div className='formInput'>
                                    <label >Exclude Ingredients:</label>
                                    <input value={excludeIngredients} onChange={(e) => setExcludeIngredients(e.target.value)} />
                                </div>
                                <div className='formInput'>
                                    <label >Intolerances:</label>
                                    <input value={intolerances} onChange={(e) => setIntolerances(e.target.value)} />
                                </div>
                                <div className='formInput'>
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

                    return(
                        <div className="singleResult" key={i}>
                            <>
                                { 
                                split[0]=='https' ?
                                <div className="resultPic" style={{backgroundImage:`url(${recipe.image})`}}></div>:
                                <div className="resultPic" style={{backgroundImage:`url(https://spoonacular.com/recipeImages/${recipe.image})`}}></div>
                                
                                }
                            </>
                            <p onClick={()=>{setSingleRecipePage(true)}}>{recipe.title}</p>
                        </div>
                    )
                }):
                <>
                <p onClick={()=>{setSingleRecipePage(false)}}>back to the Search</p>
                <SingleRecipe/>
                </>
                }
            </div>
        </div>
    </>
    )
}

export default SearchFromApi