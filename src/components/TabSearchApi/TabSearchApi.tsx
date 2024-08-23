import React, {useState} from "react";
import './style/tab-search-api.css'
// @ts-ignore
import API_service from '../../spoonacular/api_service';


const TabSearchAPI = ({tabSwitch}: {tabSwitch:string} ): React.JSX.Element => {
    const classList = tabSwitch === 'searchApi' ? 'pageContent searchApi active' : 'pageContent searchApi'
    const [searchString, setSearchString] = useState('')
    const searchForm = () => {
        return (
            <form className="formApi" onSubmit={() => {}}>
                <p className="searchLabel">Search By</p>
                <select
                    className="searchInput mg-l-Xl"
                    onChange={(e) => { }}
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
                    onClick={() => {console.log(API_service.get_recipe_from_name(searchString))}}
                >Search</button>
            </form>
        )
    }
    return (
        <div className={classList}>  
            <div className="searchFromApiCont">
                <p className="apiSearchHeader">Search Recipes with Spoonacular API</p>
                {searchForm()}
            </div>
        </div>
    )

}

export default TabSearchAPI