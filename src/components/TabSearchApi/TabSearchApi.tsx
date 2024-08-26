import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
import './style/tab-search-api.css'
import { Context } from "../../context/Context";
import axios from "axios";

import { api_service } from "../../spoonacular/api_service";

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
    console.log(tabSwitch)

    const [researchType, setresearchType] = useState<string>('')
    const [researchResultsByName, setResearchResultsByName] = useState<Results>()
    const [researchResultsByIngre, setResearchResultsByIngred] = useState<ResultsByIngred[]>()

    const context = useContext(Context)
    if (!context) throw new Error('useContext must be used within a Provider')
  
    // const { recipeId } = useParams()
  
    const { recipeIdState } = context
    const [recipeId, setRecipeId] = recipeIdState


    const searchFromIngredients = async () => {
        const results = await api_service.get_recipe_from_ingredients(searchString)
        setResearchResultsByIngred(results)
    }

    const searchFromName = async () => {
        const results = await api_service.get_recipe_from_name(searchString)
        setResearchResultsByName(results)
    }

    const populateResultsRecipeName = () => {

        if (
            researchResultsByName && 
            researchResultsByName.results.length > 0
        ) {
            console.log('Recipe Name', searchString)

            return (
                <>

                    {researchResultsByName.results.map((result: SingleResult) => (

                        result.image && result.sourceUrl.includes('https://www.foodista.com/')?
    
                            <div className="singleResult" key={result.id}>
                                <div className="imgCont">
                                    <img src={`${researchResultsByName.baseUri}${result.image}`} alt="" />
                                </div>
                                <a href={result.sourceUrl} target="_blank">{result.title}</a>
                            </div>

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

        if (
            researchResultsByIngre && 
            researchResultsByIngre.length > 0
        ) {
            console.log('Ingredients', searchString)
            return (
                <>

                    {researchResultsByIngre.map((result: ResultsByIngred) => (

                        result.image ?
    
                            <div className="singleResult" key={result.id}>
                                <div className="imgCont">
                                    <img src={`${result.image}`} alt="" />
                                </div>
                                <Link 
                                    to={`/recipe/${result.id}`}
                                    onClick={()=>{
                                        setRecipeId(result.id)
                                    }}>
                                    {result.title}
                                </Link>
                                {/* <a href={`https://www.foodista.com/recipe/${result.id}/${result.title.replace(' ','-')}`} target="_blank">{result.title}</a> */}
                            </div>

                        :
                        null
                        
                    ))}
                </>
            )
        } else if (researchResultsByIngre && researchResultsByIngre.length === 0){
            return <p>No results found.</p>
        } else {
            return <></>
        }

    }

    // useEffect(populateResults,[])
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        researchType === 'byName' ? searchFromName() : searchFromIngredients() 
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
                        setresearchType(e.target.value)
                        setTimeout(() => {
                            console.log(researchType)
                        },1500)
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