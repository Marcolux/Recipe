import React from "react";
import './style/tab-search-api.css'


const TabSearchAPI = ({tabSwitch}: {tabSwitch:string} ): React.JSX.Element => {
    const classList = tabSwitch === 'searchApi' ? 'pageContent searchApi active' : 'pageContent searchApi'

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
                    value={""}
                    onChange={(e) => {}}
                />
                <button className="button dark small">Search</button>
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