import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import RecipeCard from "../RecipeCard/RecipeCard";

import { api_service } from "../../spoonacular/api_service";
import './style/tab-search-api.css'

interface Results {
    baseUri: string,
    expires: number,
    number: number,
    offset: number,
    processingTimeMs: number,
    results: SingleResult[]
}
interface ResultsByIngred {
    id: number
    image: string
    imageType: string
    title: string
}

interface SingleResult {
    id: number,
    image: string,
    readyInMinutes: number,
    servings: number,
    sourceUrl: string,
    title: string
}

const TabSearchAPI = ({tabSwitch}: {tabSwitch:string} ): React.JSX.Element => {
    const classList = tabSwitch === 'searchApi' ? 'pageContent searchApi active' : 'pageContent searchApi'
    const [searchString, setSearchString] = useState('')

    const context = useContext(Context)
    if (!context) throw new Error('useContext must be used within a Provider')

    const {  researchTypeState, researchResultsByIngreState, researchResultsByNameState } = context

    const [researchType, setResearchType] = researchTypeState
    const [researchResultsByName, setResearchResultsByName] = researchResultsByNameState
    const [researchResultsByIngre, setResearchResultsByIngreState] = researchResultsByIngreState

    const populateResultsRecipeName = () => {

        if (researchResultsByName && researchResultsByName.results.length > 0) {

            return (
                <>

                    {researchResultsByName.results.map((result: SingleResult) => (

                        result.image && result.sourceUrl.includes('https://www.foodista.com/')?
    
                            <RecipeCard  
                                key={result.id} 
                                id={result.id} 
                                image={`${researchResultsByName.baseUri}${result.image}`} 
                                title={result.title}
                            ></RecipeCard>

                        :
                        null
                        
                    ))}
                </>
            )
        } else if (researchResultsByName && researchResultsByName.results.length === 0){
            return <p>No results found.</p>
        } else {
            return <></>
        }

    }
    const populateResultsByIngredients = () => {

        if (  researchResultsByIngre.length > 0) {
            return (
                <>
                    {researchResultsByIngre.map((result: ResultsByIngred) => (

                        result.image ?
                            <RecipeCard  
                                key={result.id} 
                                id={result.id} 
                                image={result.image} 
                                title={result.title}
                            ></RecipeCard>
                        :
                        null
                        
                    ))}
                </>
            )
        } else if ( researchResultsByIngre.length === 0){
            return <p>No results found.</p>
        } else {
            return <></>
        }
    }

    const searchForm = () => {
        return (
            <form 
                className="formApi" 
                onSubmit={handleSubmit}
            >
                <p className="searchLabel">Search By</p>
                <select
                    className="searchInput mg-l-Xl"
                    value={researchType}
                    onChange={(e) => {
                        // e.preventDefault()
                        setResearchType(e.target.value)
                    }}
                >
                    <option>select the search criteria</option>
                    <option value={"byName"}>Recipe Name</option>
                    <option value={"byIngredients"}>Recipe Ingredients</option>
                </select>

                <input
                    className="searchInput mg-x-Xl"
                    value={searchString}
                    onChange={(e) => {setSearchString(e.target.value)}}
                />
                <button 
                    className="button dark small"
                    type="submit"
                >Search</button>
            </form>
        )
    }

    const searchFromIngredients = async () => {
        const results = await api_service.get_recipe_from_ingredients(searchString)
        setResearchResultsByIngreState(results)
    }
    const searchFromName = async () => {
        const results = await api_service.get_recipe_from_name(searchString)
        setResearchResultsByName(results)
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        researchType === 'byName' ? searchFromName() : searchFromIngredients() 
    }
    
    return (
        <div className={classList}>  
            <div className="searchFromApiCont">
                <p className="apiSearchHeader">Search Recipes with Spoonacular API</p>
                {searchForm()}
                <div className="singleResultsContainer">

                    {
                        researchType === 'byName'
                        ?
                        populateResultsRecipeName()
                        :
                        populateResultsByIngredients()
                    }
                </div>
            </div>
        </div>
    )

}

export default TabSearchAPI